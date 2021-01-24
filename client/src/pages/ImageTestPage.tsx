import React from "react";
import { Link } from "react-router-dom"; 
import { Grid, Button } from "semantic-ui-react";
import "./Home.css";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

function ImageTestPage() {
  document.title = "Image Test";

  const inputRef = React.useRef<HTMLInputElement>(null);

  const testImage = () => {
    console.log("hello")
    const resumeName = "test"
    const resumeInput = inputRef.current;
    if (resumeInput != null && resumeInput.files!.length > 0) {
      console.log("PRE-AXIOS")
      let reader = new FileReader();

      var resumeFile = resumeInput.files![0]
      console.log(resumeFile)
      reader.onload = (() => {
        let data = {
        "resumeName": resumeName,
        "dataURL": reader.result
        }
        console.log("Trying to post resume")
        axios
        .post(`http://localhost:3080/api/items/addImage`, data)
        .then(
        (res) => {
            console.log("Nice!")
            console.log(res)
        },
        (error) => {
            console.error(error);
        }
        );
      });
      console.log("am i getting here?")
      reader.readAsDataURL(resumeFile);

    // ImageController.sendResumeToDrive("test", "test", "test")

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
            Upload a PDF resume. (5MB limit)
          </p>
          <input type="file" name="resume" accept="application/pdf" id="resume" ref={inputRef}>
            
          </input>

        <button onClick={testImage}>
            Send Image
        </button>
       
      </main>
    </Grid>
  );
};

export default ImageTestPage;