import React, { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { Alert } from "@material-ui/lab";
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
        const tmpImage = images;
        tmpImage["url"] = signedUrl;
        displayImages.push(tmpImage);
      }
      setImages(displayImages);
      setAlbumProgress("loaded");
    });
  };

  const albumContent = () => {
    switch (albumProgress) {
      case "loading":
        return <h2>loading album</h2>;
      case "loaded":
        return;
      default:
        break;
    }
  };
  const ImageComponent = (props) => {
    const image = props.image;
    const imageStyle = {
      height: "100px",
      weight: "100px",
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
          setShowAlert("Add tag" + tag + "successfully");
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
      <div>
        <img style={{ imageStyle }} src={image["url"]} alt="" />
        <label>Add tags:</label>
        <input type="text" name="tag" onChange={handleTagChange} />
        <button onClick={() => addTag()}>Add tag</button>
        {showAlert !== "" ? (
          <Alert
            onClose={() => {
              setShowAlert("");
            }}
          >
            {showAlert}
          </Alert>
        ) : null}
        <button onClick={() => deleteImageFromDb()}>Delete</button>
      </div>
    );
  };

  return <div></div>;
};

export default Query;
