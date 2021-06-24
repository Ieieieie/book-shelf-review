const axios = require("axios");

exports.fetchNewComic = async function (userId: string) {
  return await axios
    .get(
      "http://books.rakuten.co.jp/event/book/comic/calendar/js/booklist.json"
    )
    //@ts-ignore
    .then((res) => {
      const column = res.data.column;
      const parsedBooks = [];
      const columns = [
        "eisbn",
        "ttl",
        "url",
        "athr",
        "img",
        "ahid_id",
        "fc1_id",
      ].map((c) => column.indexOf(c));
      for (const item of res.data.list) {
        const newItem: { [key: string]: string | number } = {};
        columns.forEach((c) => {
          newItem[column[c]] = item[c];
        });
        parsedBooks.push(newItem);
      }
      return parsedBooks;
    })
    .catch((error: Error) =>
      console.log(`fetchNewComicエラーですよ：${error}`)
    );
};
