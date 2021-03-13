import React from "react";
import { Grid } from "semantic-ui-react";
import "./Home.css";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

function ImageTestPage() {
  document.title = "Image Test";

  const inputRef = React.useRef<HTMLInputElement>(null);

  const testImage = () => {
    const imageName = "test"
    const imageInput = inputRef.current;
    console.log("imageInput:")
    console.log(imageInput)
    // console.log(imageInput.type)
    if (imageInput != null && imageInput.files!.length > 0) {
      let reader = new FileReader();
      var imageFile = imageInput.files![0]
      console.log("ImageFile:")
      console.log(imageFile)
      console.log(imageFile.type)

      reader.onload = (() => {
        let data = {
          "token": localStorage.getItem("lnf_token"),
          "imageName": imageName,
          "dataURL": reader.result
        }
        console.log("Trying to add image")
        console.log(reader.result)
        axios
        .post(`/api/items/addImage`, data)
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
          <img src="http://drive.google.com/uc?export=view&id=1IOMjNoMaDABl8duK9owfqfW789uqhD_l"/>

        <button onClick={testImage}>
            Send Image
        </button>
       
      </main>
    </Grid>
  );
};

export default ImageTestPage;