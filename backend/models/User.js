const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "faculty"], required: true },
    department: {type:String},
    register:{type:String},
    year:{type:String},
    section:{type:String},
    dob:{type:Date},
    phone:{type:String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
