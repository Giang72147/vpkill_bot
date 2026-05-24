const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

const PAGE_ACCESS_TOKEN = "DÁN_PAGE_TOKEN_VÔ_ĐÂY";

app.get("/", (req, res) => {
  res.send("VPKILL BOT ONLINE");
});

app.post("/webhook", async (req, res) => {

  const body = req.body;

  if (body.object === "page") {

    for (const entry of body.entry) {

      const webhook_event = entry.messaging[0];

      // USER NHẮN TIN
      if (webhook_event.message) {

        const sender_psid = webhook_event.sender.id;

        // reply text
        await callSendAPI(sender_psid, {
          text: "💜 Chào mừng bạn đến với box VPKILL"
        });
      }

      // USER VÀO BOX
      if (webhook_event.member_joined) {

        const sender_psid = webhook_event.sender.id;

        await callSendAPI(sender_psid, {
          text: "✨ Chào mừng thành viên mới đến với VPKILL"
        });
      }
    }

    res.status(200).send("EVENT_RECEIVED");

  } else {
    res.sendStatus(404);
  }
});

app.get("/webhook", (req, res) => {

  const VERIFY_TOKEN = "vpkill_verify";

  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {

    if (token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

async function callSendAPI(sender_psid, response) {

  await axios.post(
    `https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
    {
      recipient: {
        id: sender_psid
      },
      message: response
    }
  );
}

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`BOT RUNNING ${PORT}`);
});
