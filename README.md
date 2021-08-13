# CMU Lost and Found Page

This is the code for the CMU Lost and Found Page.

```
cd api
npm install
npm start (or npm run dev)
```
In a separate terminal window, run
```
cd client
npm install
npm start
```

Now, the website should be running at `localhost:3000`. The API currently runs on port 3080. The client (development only) runs on port 3000. For production, build the client and deploy it with the API on port 3080.

Afterwards, you will need to create a new `.env` file. The `.env` file stores secret credentials. Run
```
cp .env.config .env
```
and fill out the fields.

Credits to Bhargav Bachina for template: 
https://medium.com/bb-tutorials-and-thoughts/how-to-develop-and-build-react-app-with-nodejs-backend-typescript-version-27a6a283a7c5
https://github.com/bbachi/react-nodejs-typescript-example
