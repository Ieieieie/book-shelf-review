import * as functions from "firebase-functions";
import { NotificationSeries } from "./types/notificationSeries";
const admin = require("firebase-admin"); // // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// exports.onWriteNotificationSeries = functions
//   .region("asia-northeast1")
//   .firestore.document("users/{userId}/notificationSeries/{seriesId}")
//   .onWrite(async (change, context) => {
//     const { seriesId } = context.params;
//     const series = change.after.data() as NotificationSeries;
//   });

exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin
    .firestore()
    .collection("messages")
    .add({ original: original });
  // Send back a message that we've successfully written the message
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});
