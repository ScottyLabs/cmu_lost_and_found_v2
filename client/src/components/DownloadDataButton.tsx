import axios from "axios";
import React, { useState } from "react";
import { Button, Grid, Modal, Form, Message } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DownloadDataButton.css";
import { BuildingType } from "../enums/locationTypes";
import { User } from "../interface/user";
import emailbody from "../templates/html/emailbody";
import { PermissionType } from "../enums/permissionType";
import { TemplateType } from "../enums/templateTypes";
import { UseTemplate } from "../templates/emailTemplates";
import MongoClient from "mongodb";

function exampleReducer(dispatchState: any, action: any) {
  switch (action.type) {
    case "CONFIG_CLOSE_ON_DIMMER_CLICK":
      return { ...dispatchState, closeOnDimmerClick: action.value };
    case "CONFIG_CLOSE_ON_ESCAPE":
      return { ...dispatchState, closeOnEscape: action.value };
    case "OPEN_MODAL":
      return { ...dispatchState, open: true };
    case "CLOSE_MODAL":
      return { ...dispatchState, open: false };
    default:
      throw new Error();
  }
}

function DownloadDataButton(props: { fetchItems: Function; isAdmin: boolean }) {
    
  const printy = () => {
    // const mongodb = require("mongodb").MongoClient;
    // const fastcsv = require("fast-csv");
    // const fs = require("fs");
    // const ws = fs.createWriteStream("bezkoder_mongodb_fastcsv.csv");
    // // let url = "mongodb://username:password@localhost:27017/";
    // let url = process.env.MONGO_URI || "mongodb://localhost:27017";
    // mongodb.connect(
    //   url,
    //   { useNewUrlParser: true, useUnifiedTopology: true },
    //   (err, client) => {
    //     if (err) throw err;
    //     client
    //       .db("zkoder_db")
    //       .collection("category")
    //       .find({})
    //       .toArray((err, data) => {
    //         if (err) throw err;
    //         console.log(data);
    //         fastcsv
    //           .write(data, { headers: true })
    //           .on("finish", function() {
    //             console.log("Write to bezkoder_mongodb_fastcsv.csv successfully!");
    //           })
    //           .pipe(ws);
    //         client.close();
    //       });
    //   }
    // );
    console.log("bruh");
  };

  function download () {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent("hello"));
    element.setAttribute('download', "file.txt");
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }  
  
  return (
    <Grid columns={1}>
      <Grid.Column>
            <Button
              color="red"
              style={{ height: "47px", width: "110px", marginLeft: "2px" }}
              onClick={download}
            >
              Download Data
            </Button>
        {/* <Modal
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          open={open}
          onOpen={handleOnOpen}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          trigger={
            <Button
              color="red"
              style={{ height: "47px", width: "110px", marginLeft: "2px" }}
            >
              Download Data
            </Button>
          }
        >
          <Modal.Header>BBB</Modal.Header>
          <Modal.Content>
          </Modal.Content>
        </Modal> */}
      </Grid.Column>
    </Grid>
  );
}

export default DownloadDataButton;
