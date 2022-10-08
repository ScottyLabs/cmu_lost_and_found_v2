import "./Login.css";
import "semantic-ui-css/semantic.min.css";

import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, Icon, Loader, Segment, Message } from "semantic-ui-react";

function Login() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (window.localStorage.getItem("lnf_token")) {
      history.push("/");
    }
  }, []);

  const popupCenter = (title: string, w: number, h: number): Window | null => {
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
      "about:blank",
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

    const pollTimer = window.setInterval(() => {
      if (newWindow && newWindow.closed !== false) {
        window.clearInterval(pollTimer);
        setLoading(false);
      }
    }, 200);

    return newWindow;
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
                  const loginWindow = popupCenter(
                    "Login with CMU Email",
                    400,
                    600
                  );
                  axios.get("/api/auth/signRequest").then((response) => {
                    if (response.data.token) {
                      if (loginWindow) {
                        loginWindow.location.href =
                          "https://login.scottylabs.org/login/" +
                          response.data.token;
                      } else {
                        alert("Unable to create login request");
                      }
                    }
                  });
                  window?.addEventListener(
                    "message",
                    (event) => {
                      if (event.origin !== "https://login.scottylabs.org") {
                        return;
                      } else if (event.data === "error") {
                        setLoading(false);
                      } else {
                        window.localStorage.setItem("lnf_token", event.data);
                        axios
                          .post("/api/auth/login", {
                            token: event.data,
                          })
                          .then(() => {
                            history.push("/");
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
      <Message id="login-message" warning size="large">
        <p>
          If you are not affiliated with Carnegie Mellon University, please
          reach out to the Cohon University Center Lost &amp; Found Desk by
          emailing
          <a href="mailto:cucinfodesk@andrew.cmu.edu">
            {" "}
            cucinfodesk@andrew.cmu.edu{" "}
          </a>
          or by calling 412-268-2107.
        </p>
      </Message>
    </div>
  );
}

export default Login;
