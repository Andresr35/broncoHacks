const User = require("./models/User");
const Club = require("./models/Club");
const Event = require("./models/Event");
const Post = require("./models/Post");
const httpMocks = require("node-mocks-http");
const { getClasses, postClass, getProfessor } = require("./controllers/classController");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://vinhph003:passworde@cluster0.zdxrkke.mongodb.net/?retryWrites=true&w=majority";
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("connected");
}

async function testModel() {
  const user = new User({
    name: "John Doe",
    email: "example@gmail.com",
    password: "password",
    age: 20,
    gender: "male",
    bio: "I am a student",
    friendRequests: [],
    friends: [],
    ratings: 5,
    tags: ["student"],
    picture: "example.com"
  });

  // const event = new Event({
  //   name: "test",
  //   description: "test",
  //   picture: "test",
  //   type: "Study",
  //   attendees: [user._id],
  //   posts: [],
  //   meeting_time: "10:00am",
  //   meeting_location: "library"
  // });

  const req = httpMocks.createRequest({
    body: {
      name: 'CS2400',
      description: 'Data Structures and Algorithms',
      professor: 'Thanh Nguyen',
      students: [user._id],
      picture: 'Test Picture',
      meeting_time: new Date(),
      meeting_location: "Bldg 3 RM 204"
    },
  });
  const res = httpMocks.createResponse();
  console.log(res._getData());
  const next = null;
  await postClass(req, res, next);
  const req2 = httpMocks.createRequest({
    body: {
      name: 'CS2640',
      description: 'Computer Organization and Assembly Language Programming',
      professor: 'Thanh Nguyen',
      students: [user._id],
      picture: 'Test Picture',
      meeting_time: new Date(),
      meeting_location: "Bldg 8 RM 304"
    },
  });
  const res2 = httpMocks.createResponse();
  const next2 = null;
  await postClass(req2, res2, next2);

  await getProfessor(req, res, next);
  console.log(res._getData());


  console.log("finished");
}

testModel()
