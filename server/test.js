const User = require("./models/User");
const Club = require("./models/Club");
const Event = require("./models/Event");
const Post = require("./models/Post");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://vinhph003:passworde@cluster0.zdxrkke.mongodb.net/?retryWrites=true&w=majority";
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("connected");
}

const name = person.fullName();
const user = new User({
  name,
  email: internet.email({
    firstName: name.split(" ")[0],
    lastName: name.split(" ")[1],
  }),
  password: internet.password(),
  age:
    2024 -
    date.birthdate({ min: 18, max: 65, mode: "age" }).getFullYear(),
  gender: person.sex(),
  bio: person.bio(),
  picture: internet.avatar(),
});

const post = new Post({
  author: user._id,
  message: lorem.paragraph(),
  title: lorem.words(),
});

const postTwo = new Post({
  author: user._id,
  message: lorem.paragraph(),
  title: lorem.words(),
});

console.log(user);
await user.save();
await post.save();
await postTwo.save();
console.log("finished");

