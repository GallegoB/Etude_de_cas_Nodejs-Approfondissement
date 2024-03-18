const { Schema, model } = require("mongoose");

const articleSchema = Schema({
  title: String,
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  enumeration: {
    type: String,
    enum: {
      values: ["draft", "published"],
      message: "{VALUE} inconnue",
    },
    default: "draft",
  },
});

module.exports = model("article", articleSchema);

/*async function test() {
  const articles = await Article.find().populate({
    path: "user",
    select: "-password",
    match: { name: /ben/i },
  });
  console.log(articles.filter((article) => article.user));
}*/
// async function test() {
//   const articles = await Article.find();
//   new Article({
//     title: "titre 3",
//     content: "sdjqcsqjdhqdhj",
//     user: "65d442db2674e9e47fb4e520",
//   }).save();
// }
// test();
