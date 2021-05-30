import API from "@aws-amplify/api";
import { Alert } from "bootstrap";
import React, { useState } from "react";

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
        ></Alert>
      ) : null}
      <button onClick={() => deleteImageFromDb()}>Delete</button>
    </div>
  );
};

export default ImageComponent;
