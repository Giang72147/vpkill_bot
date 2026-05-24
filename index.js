const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

const PAGE_ACCESS_TOKEN = "EAAVZBaK9asvYBRjzoZABlbWZAo20XFuiUeqgM4TutcS1h7vyBwc9eAXTzLDUNvhJzZCZAlccgCDZC1Flu1KNpcpZALTzZBUOzNKvXZBcAC8wlVgsD5Gn3ZAaQlZASQVkzZCA3fgkXJZA9d2EKEif33MNXZCrXX02CmZBbIWBiua7B00tCmG0YAsU2fZAfQs3owDWmbuwArYnUJxudAjRDQp2KDSuMsUCAqmcKZBgGA5Expln7";

// TEST
app.get("/", (req, res) => {
  res.send("VPKILL BOT ONLINE");
});

// WEBHOOK
app.post("/webhook", async (req, res) => {

  const body = req.body;

  if (body.object === "page") {

    for (const entry of body.entry) {

      const webhook_event = entry.messaging[0];

      // USER NHẮN TIN
      if (webhook_event.message) {

        const sender_psid = webhook_event.sender.id;

        // GỬI ẢNH
        await callSendAPI(sender_psid, {
          attachment: {
            type: "image",
            payload: {
              url: "https://placehold.co/600x400/png"
            }
          }
        });

        // GỬI TEXT
        await callSendAPI(sender_psid, {
          text: "💜 Chào mừng bạn đã đến box VPKILL"
        });

      }

    }

    res.status(200).send("EVENT_RECEIVED");

  } else {
    res.sendStatus(404);
  }

});

// VERIFY
app.get("/webhook", (req, res) => {

  const VERIFY_TOKEN = "vpkill_verify";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {

    if (token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }

  }

});

// SEND API
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
