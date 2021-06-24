import { NotificationSeries } from "./types/notificationSeries";
type Book = {
  eisbn: string;
  ttl: string;
  img: string;
  athr: string;
  ahid_id: string;
  fc1_id: string;
};

type BookList = {
  [key: string]: Book;
};
exports.filterBooks = async function (
  bookList: BookList,
  filterSeries: Array<NotificationSeries>
) {
  const filteredBooks: Array<any> = [];
  console.log(bookList);
  filterSeries.forEach((series) => {
    (Object.keys(bookList) as (keyof Book)[]).map((key) => {
      if (
        series.author.indexOf(bookList[key].athr) > -1 &&
        bookList[key].ttl.indexOf(series.seriesName) > -1
      ) {
        filteredBooks.push(bookList[key]);
      }
    });
  });
  return filteredBooks;
};
