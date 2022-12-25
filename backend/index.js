const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err));

const studentData = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  classes: {
    type: Number,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  roll_no: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Student", studentData);

// Insert Student List
app.post("/add", async (req, res) => {
  const { name, age, classes, section, roll_no, email, mobile, address } =
    req.body;

  const newStudent = new Student({
    name: name,
    age: age,
    classes: classes,
    section: section,
    roll_no: roll_no,
    email: email,
    mobile: mobile,
    address: address,
  });

  try {
    await newStudent.save();
    res.send("Success");
  } catch (err) {
    res.status(500).send("An unknown error occurred.");
  }
});

// Get All Student List
app.get("/read", (req, res) => {
  Student.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

// Update Student List

app.put("/update", async (req, res) => {
  const { name, id, age, classes, section, roll_no, email, mobile, address } =
    req.body;

  try {
    await Student.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          age: age,
          classes: classes,
          section: section,
          roll_no: roll_no,
          email: email,
          mobile: mobile,
          address: address,
        },
      },
      {
        new: true,
      },
      function (err, result) {
        if (err) {
          console.log(err);
        }
        res.send("Done");
      }
    );

    res.send("Updated");
  } catch (err) {
    console.log(err);
  }
});

//Delete Student List

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await Student.findByIdAndRemove(id).exec();
  res.send("Delete");
});

//admin login

const adminLogin = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", adminLogin);

// app.get("/auth/login", async (req, res) => {
//   const newAdmin = new Admin({
//     email: "admin@admin.com",
//     password: "admin",
//   });

//   try {
//     await newAdmin.save();
//     res.send("Success");
//   } catch (err) {
//     res.status(500).send("An unknown error occurred.");
//   }
// });

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Admin.findOne({ email });

  try {
    if (!user) {
      res.status(400).send("User Not found");
      res.redirect("/auth/login");
    } else if (user.email === email && user.password === password) {
      res.send(user);
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log("app is working on port 5000");
});
