import React from "react";
import { Grid, Button } from "semantic-ui-react";
import "./Home.css";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

function ImageTestPage() {
  document.title = "Image Test";

  const inputRef = React.useRef<HTMLInputElement>(null);

  const testImage = () => {
    const imageName = "test"
    const imageInput = inputRef.current;
    if (imageInput != null && imageInput.files!.length > 0) {
      let reader = new FileReader();
      var imageFile = imageInput.files![0]
      console.log(imageFile)

      reader.onload = (() => {
        let data = {
        "imageName": imageName,
        "dataURL": reader.result
        }
        console.log("Trying to add image")
        axios
        .post(`http://localhost:3080/api/items/addImage`, data)
        .then(
        (res) => {
            console.log("Image uploaded successfully")
            console.log(res)
            let finalURL = res.data.msg.fileId
            console.log(finalURL)
            console.log('http://drive.google.com/uc?export=view&id=' + finalURL)
        },
        (error) => {
            console.error(error);
        }
        );
      });
      reader.readAsDataURL(imageFile);
    }
  }

  return (
    <Grid>
      <main>
        <h1 id="title">Welcome to the<br></br>IMAGE TEST</h1>
        <img src="/dog-logo.png" alt="CMU Lost and Found Logo"></img>
        <br></br>
        <br></br>

          <p>
            Upload an image. (5MB limit)
          </p>
          <input type="file" name="image" accept="image/*" id="image" ref={inputRef}>
            
          </input>

        <button onClick={testImage}>
            Send Image
        </button>
       
      </main>
    </Grid>
  );
};

export default ImageTestPage;