import React, { useEffect, useState } from "react";
import { Button, Icon, Loader, Segment } from "semantic-ui-react";
import LoginForm from "../components/LoginForm";
import "./Login.css";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router";

// let loginPK: string;

function Login() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (window.localStorage.getItem("lnf_token")) {
      history.push("/");
    }
  }, []);

  const popupCenter = (
    url: string,
    title: string,
    w: number,
    h: number
  ): void => {
    const dualScreenLeft =
      window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop =
      window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : window.screen.width;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : window.screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    const newWindow = window.open(
      url,
      title,
      `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
    );

    newWindow?.focus();
  };

  document.title = "CMU Lost and Found";
  return (
    <div id="login">
      <img src="/dog-logo.png" />
      <Segment.Group id="login-box">
        <Segment padded="very">
          {loading ? (
            <Loader active>Loading</Loader>
          ) : (
            <>
              <h3 id="title">Please login to access this site</h3>
              <Button
                id="login-button"
                icon
                labelPosition="left"
                onClick={() => {
                  setLoading(true);
                  const loginRequest = jwt.sign(
                    {
                      redirectUrl: "http://localhost:3000",
                      restrictDomain: true,
                      applicationId: process.env.REACT_APP_LOGIN_ID,
                    },
                    process.env.REACT_APP_LOGIN_SK || "",
                    { algorithm: "RS256", expiresIn: "5 minutes" }
                  );
                  popupCenter(
                    process.env.REACT_APP_LOGIN_ENDPOINT +
                      "/login/" +
                      loginRequest,
                    "Login with CMU Email",
                    400,
                    600
                  );
                  window?.addEventListener(
                    "message",
                    (event) => {
                      if (
                        event.origin !== process.env.REACT_APP_LOGIN_ENDPOINT
                      ) {
                        return;
                      } else {
                        window.localStorage.setItem("lnf_token", event.data);
                        axios
                          .post("/api/auth/login", {
                            token: event.data,
                          })
                          .then((response) => {
                            if (response.data) {
                              window.localStorage.setItem(
                                "lnf_isAdmin",
                                response.data.isAdmin
                              );
                              setLoading(false);
                              history.push("/");
                            }
                            setLoading(false);
                          })
                          .catch(() => {
                            setLoading(false);
                            alert("Failed to log in");
                          });
                      }
                    },
                    false
                  );
                }}
              >
                <Icon name="sign in" />
                Sign in with CMU SSO
              </Button>
            </>
          )}
        </Segment>
      </Segment.Group>
    </div>
  );
}

export default Login;
