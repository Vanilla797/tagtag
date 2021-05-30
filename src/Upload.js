import React, { useState } from "react";
import Amplify, { Storage } from "aws-amplify";
import styled from "styled-components";
import awsconfig from "./aws-exports";
import Input from "@material-ui/core/Input";
Amplify.configure(awsconfig);

function Upload() {
  const [upload, setUpload] = useState();

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      await Storage.put(file.name, file, {
        level: "private", // contentType is optional
      });
      console.log("upload done");
      setUpload("uploaded");
      alert("Image uploaded successfully");
    } catch (error) {
      console.log("Error uploading file: ", error);
      alert("Fail to upload");
    }
  }

  return (
    <Container>
      <h2>Image upload</h2>
      <Input type="file" accept="image/*" onChange={onChange} />
    </Container>
  );
}

export default Upload;

const Container = styled.div`
  padding: 50px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px gray;
  text-align: center;
`;
// const Input = styled.input`
//   font-size: 18px;
//   padding: 10px;
//   border-radius: 5px;
//   border: solid;
//   width: 300px;
// `;
