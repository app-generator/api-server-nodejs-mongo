import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  role_no: {
    type: Number,
    default: 0,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Role = mongoose.model("Role", RoleSchema);
export default Role;
