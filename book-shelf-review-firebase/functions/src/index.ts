import * as functions from "firebase-functions";
import admin = require("firebase-admin");
let uuid = require("node-uuid");

const { fetchNewComic } = require("./fetchNewComic");
const { filterBooks } = require("./filterBooks");
const { getNotificationSeries } = require("./getNotificationSeries");

admin.initializeApp();

exports.onWriteNotificationSeries = functions
  .region("asia-northeast1")
  .firestore.document("users/{userId}/notificationSeries/{seriesId}")
  .onWrite(async (data, context) => {
    const { userId } = context.params;

    try {
      const parsedBooks = await fetchNewComic(userId);
      const filterSeries = await getNotificationSeries(userId);
      const filteredBooks = await filterBooks(parsedBooks, filterSeries);

      if (filteredBooks.length > 0) {
        const db = admin.firestore();
        const batch = db.batch();
        try {
          for (const book in filterBooks) {
            let id = uuid.v4();
            let ref = db
              .collection("users")
              .doc(userId)
              .collection("notificationBooks")
              .doc(id);
            batch.set(ref, { ...filterBooks[book] });
          }
          batch.commit();
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
