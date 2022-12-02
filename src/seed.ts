import "dotenv/config";
import mongoose from "mongoose";

import database from "./server/database";
import Role from "./models/role";

const dummyData = [
  {
    role_no: 1,
    name: "admin",
  },
  {
    role_no: 2,
    name: "user",
  },
];

database.connect();

const seedDB = async () => {
  await Role.deleteMany({});
  await Role.insertMany(dummyData);
};

seedDB()
  .then(() => {
    mongoose.connection.close();
    console.log("Data seeded successfully");
  })
  .catch((err) => console.log(`Could not seed data due to ${err.message}`));
