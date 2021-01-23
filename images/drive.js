const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const stream = require('stream');
let controller = {};

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

/**
 * Send a resume to Drive
 * @param {String} resumeName
 * @param {String} dataURL
 * @param {json} profile
 * @param {Function} callback
 */
controller.sendResumeToDrive = (resumeName, dataURL, profile, callback) => {
    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Drive API.
        authorize(JSON.parse(content), addResume(resumeName, dataURL, profile, callback));
    });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

function addResume(resumeName, dataURL, profile, callback) { 
    return (auth) => {
        var buffer = new Buffer(dataURL.split(",")[1], 'base64');
        let bufferStream = new stream.PassThrough();
        bufferStream.end(buffer);
        const drive = google.drive({ version: 'v3', auth });
        const folder_id = process.env.FOLDER_ID;
        var fileMetadata = {
            'name': resumeName,
            'mimeType': 'application/pdf',
            'parents': [folder_id],
            'description': JSON.stringify(profile)
        };
        var media = {
            mimeType: 'application/pdf',
            body: bufferStream
        };
        drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        }, (err, file) => {
            if (err) {
                callback(err);
            } else {
                callback(null, {
                    fileId: file.data.id
                });
            }
        });
    }
}

module.exports = controller;