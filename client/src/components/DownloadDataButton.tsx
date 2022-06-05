import axios from "axios";
import React, { useState } from "react";
import { Button, Grid, Modal, Form, Message } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DownloadDataButton.css";
import { Item } from "../interface/item";
import { BuildingType } from "../enums/locationTypes";
import { User } from "../interface/user";
import emailbody from "../templates/html/emailbody";
import { PermissionType } from "../enums/permissionType";
import { TemplateType } from "../enums/templateTypes";
import { UseTemplate } from "../templates/emailTemplates";

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

function DownloadDataButton(props: { fetchItems: Function; items: Item[] }) {

  function download () {
    props.fetchItems();
    var element = document.createElement('a');
    /**
     * This section is not compatible with static site generation
     */

    (async () => {
      const newArr = props.items.map(({
        _id,
        id,
        imagePermission,
        approved,
        publicDisplay,
        whereToRetrieve,
        ...rest}) => {
        return rest;
      });

      // Convert object to json
      const objectToCsv = (data : Object[]) => {
        const csvRows = [];
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(','));
  
        // Grabs the object key list so csv entries are in a fixed order
        let trueValues = [] as string[];
        for (const row of data) {
          const keyList = Object.keys(row);
          if (trueValues.length < keyList.length) 
            trueValues = keyList;
        }

        // Loop to get value of each objects key
        for (const row of data) {
          // "array" that allows for the empty entries to exist
          const values = trueValues.map(tag => row[tag as keyof typeof row]);

          /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           Merges any subarrays into a string. 
           Ex. [[a,b,c], x2, x3, [a,b,d]]
           turns into
            [a; b; c, x2, x3, a; b; d]
           because join(",") would otherwise make the string 
            a,b,c,x2,x3,a,b,d 
           which gets screwy in the CSV. 
           * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
          const valueArray = Array.from(values);
          const valueSingled = [];
          for (const val of valueArray) {
            if (Array.isArray(val)) {
              valueSingled.push(val.join(", "))
            } else {
              valueSingled.push(val)
            }
          }

          // Puts quotes around strings to allow for commas in CSV format
          const valueCleaned = [];
          for (const val of valueSingled) {
            if (typeof val == 'string' || val instanceof String) {
              valueCleaned.push("\"" + val + "\"")
            } else {
              valueCleaned.push(val)
            }
          }

          // Removes newline cuz it can break CSVs (quotes should fix it but just to be safe)
          const strippedValues = valueCleaned.join(',').replace(/(\r\n|\n|\r)/gm, "")
          csvRows.push(strippedValues);
        }
        return csvRows.join('\n');
      };

      const objItem = objectToCsv(newArr);
      const element = document.createElement("a");
      const file = new Blob([objItem],{type:'application/json'});
      element.href = URL.createObjectURL(file);
      element.download = "lostAndFoundData.csv";
      document.body.appendChild(element);
      element.click();
    })();
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
      </Grid.Column>
    </Grid>
  );
}

export default DownloadDataButton;
