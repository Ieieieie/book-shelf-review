import { NotificationSeries } from "./types/notificationSeries";
import admin = require("firebase-admin");

exports.getNotificationSeries = async function (userId: string) {
  const db = admin.firestore();
  try {
    const snapshot = await db
      .collection("users")
      .doc(userId)
      .collection("notificationSeries")
      .get();
    const series = snapshot.docs.map((doc) => doc.data() as NotificationSeries);
    return series;
  } catch (error) {
    console.log(error);
    return error;
  }
};
