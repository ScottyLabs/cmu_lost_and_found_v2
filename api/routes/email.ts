import axios from "axios";
import { Request, Response, Router } from "express";

const router = Router();

router.post("/sendEmail", async (req: Request, res: Response) => {
  let { emails, subject, text } = req.body;
  axios({
    method: "POST",
    url: "https://api.mailgun.net/v3/scottylabs.org/messages",
    auth: {
      username: "api",
      password: process.env.MAILGUN_KEY,
    },
    params: {
      from: "ScottyLabs Lost and Found <lostandfound@scottylabs.org>",
      to: emails.join(","),
      subject: subject,
      text: text,
    },
  }).then(
    (response) => {
      return res.status(200).send(response);
    },
    (reject) => {
      return res.status(500).send(reject);
    }
  );
});

export default router;
