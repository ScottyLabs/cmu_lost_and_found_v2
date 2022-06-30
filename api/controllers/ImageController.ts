// TODO: #145 Replace any types with appropriate type annotations
/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: #144 Replace bad Function types with appropriate types
/* eslint-disable @typescript-eslint/ban-types */
import { google } from "googleapis";

import fs from "fs";
import readline from "readline";
import stream from "stream";

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/drive"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

export default class ImageController {
  /**
   * Login a user given an username and password.
   * @param  {String}   username    Username address
   * @param  {String}   password Password
   * @param  {Function} callback args(err, token, user)
   */

  public static sendImageToDrive(
    imageName: string,
    dataURL: any,
    callback: Function
  ) {
    // Load client secrets from env file.
    this.authorize(
      JSON.parse(process.env.GCLOUD_CREDENTIALS),
      this.addImage(imageName, dataURL, callback)
    );
  }

  private static addImage(imageName: string, dataURL: any, callback: Function) {
    return (auth: any) => {
      const buffer = new Buffer(dataURL.split(",")[1], "base64");
      const bufferStream = new stream.PassThrough();
      bufferStream.end(buffer);
      const drive = google.drive({ version: "v3", auth });
      // const folder_id = process.env.FOLDER_ID;
      // const folder_id = 'lost_and_found_images'
      const fileMetadata = {
        name: imageName,
        mimeType: "image/*",
        // 'parents': []
      };
      const media = {
        mimeType: "image/*",
        body: bufferStream,
      };
      drive.files.create(
        {
          // TODO: #143 Check bad overload on G Drive API
          resource: fileMetadata,
          media: media,
          fields: "id",
        },
        (err: any, file: any) => {
          if (err) {
            callback(err);
          } else {
            // TODO: use proper callback stuff
            console.log("attempting to adjust permissions");
            console.log(file.data.id);
            const body = {
              // 'value': 'default',
              type: "anyone",
              role: "reader",
            };
            drive.permissions.create(
              {
                fileId: file.data.id,
                // TODO: #142 Check bad overload
                resource: body,
                auth: auth,
              },
              (err: any, _res: any) => {
                if (err) {
                  console.log("permission failure");
                  callback(err);
                } else {
                  // console.log(res)
                  callback(null, {
                    fileId: file.data.id,
                  });
                }
              }
            );
          }
        }
      );
    };
  }

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  private static authorize(credentials: any, callback: Function) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
    oAuth2Client.setCredentials(JSON.parse(process.env.GCLOUD_TOKEN));
    callback(oAuth2Client);
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  private static getAccessToken(oAuth2Client: any, callback: any) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code: any) => {
      rl.close();
      oAuth2Client.getToken(code, (err: any, token: any) => {
        if (err) return console.error("Error retrieving access token", err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err: any) => {
          if (err) return console.error(err);
          console.log("Token stored to", TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }
}
