import React, { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { Alert } from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import styled from "styled-components";
const Query = () => {
  const [albumProgress, setAlbumProgress] = useState("loading");
  const [tagStr, setTagStr] = useState("");
  //from db
  const [eTags, setETags] = useState("");
  //from s3
  const [images, setImages] = useState("");

  const loadImageETag = async () => {
    setAlbumProgress("loading");
    const tags = tagStr.split(",");
    var params = {};
    tags.forEach(function (value, i) {
      params["tags" + i] = value;
    });
    API.get("fit5225ass2", "/images", { queryStringParameters: params })
      .then((response) => {
        setETags(response);
        console.log(eTags);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    loadImage();
  }, [eTags]);

  //load image content
  const loadImage = () => {
    Storage.list("", { level: "private" }).then(async (result) => {
      var displayImages = [];
      for (const [index, image] of result.entries()) {
        if (eTags.length > 0 && !eTags.includes(image["eTag"])) continue;

        const signedUrl = await Storage.get(image["key"], { level: "private" });
        const tmpImage = image;
        tmpImage["url"] = signedUrl;
        displayImages.push(tmpImage);
      }
      setImages(displayImages);
      setAlbumProgress("loaded");
    });
  };
  const searchByTag = () => {
    return (
      <ImageContainer>
        Enter the search tag(s). Split by ","
        <Input
          type="text"
          value={tagStr}
          onChange={(e) => setTagStr(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={loadImageETag}>
          Search
        </Button>
      </ImageContainer>
    );
  };
  const searchByImage = () => {
    return (
      <ImageContainer>
        Select an image to search for images that have the same tags
        <Input type="file" accept="image/*" />
        <Button variant="contained" color="primary" onClick={loadImageETag}>
          Search
        </Button>
      </ImageContainer>
    );
  };
  const albumContent = () => {
    switch (albumProgress) {
      case "loading":
        return <h2>loading...</h2>;
      case "loaded":
        return images.map((each) => {
          return (
            <ImageComponent
              key={each["url"]}
              image={each}
              onDeleteImage={loadImageETag}
            />
          );
        });
      default:
        break;
    }
  };
  const ImageComponent = (props) => {
    const image = props.image;
    const imageStyle = {
      height: "100px",
      weight: "60px",
    };
    const [tag, setTag] = useState("");
    const [showAlert, setShowAlert] = useState("");

    const handleTagChange = (event) => {
      setTag(event.target.value);
    };

    const addTag = () => {
      const params = { etag: image["eTag"], tag };
      API.put("fit5225ass2", "/images", { queryStringParameters: params })
        .then((response) => {
          setShowAlert("Add tag " + tag + " successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const deleteImageFromDb = () => {
      const params = { etag: image["eTag"] };
      API.del("fit5225ass2", "/images", { queryStringParameters: params })
        .then((response) => {
          deleteImageFromS3();
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const deleteImageFromS3 = () => {
      const key = image["key"];
      Storage.remove(key, { level: "private" })
        .then(() => {
          props.onDeleteImage();
        })
        .catch((err) => console.log(err));
    };

    return (
      <ImageContainer>
        <img style={{ imageStyle }} src={image["url"]} alt="" />
        <Edit>
          <label>Add a tag to the image: </label>
          <span> </span>
          <Input type="text" name="tag" onChange={handleTagChange} />
          <Button variant="contained" color="primary" onClick={() => addTag()}>
            Add tag
          </Button>
          {showAlert !== "" ? (
            <Alert
              onClose={() => {
                setShowAlert("");
              }}
            >
              {showAlert}
            </Alert>
          ) : null}
          <DeleteButton>
            <Button
              variant="contained"
              color="primary"
              onClick={() => deleteImageFromDb()}
            >
              Delete this image
            </Button>
          </DeleteButton>
        </Edit>
      </ImageContainer>
    );
  };

  return (
    <>
      <div>{searchByTag()}</div>
      <div>{searchByImage()}</div>
      <div>{albumContent()}</div>
    </>
  );
};

export default Query;

const ImageContainer = styled.div`
  margin: 20px 30px;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 1px 3px gray;
  border-radius: 5px;
`;
const Edit = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const DeleteButton = styled.div`
  margin-top: 30px;
`;
