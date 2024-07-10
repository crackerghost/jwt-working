const express = require("express");
const app = express();
const path = require("path");
const connection = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "rajsingh123@";

app.use(express.json());

const db = connection.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jwt",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

app.use(express.static(path.join(__dirname, "../dist")));

app.post("/verifyLogin", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const hashedPass = await bcrypt.hash(pass, 10);
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ error: err });
      }
      if (data.length > 0) {
        const user = data[0];
        const isMatch = await bcrypt.compare(pass, user.Password);
        if (isMatch) {
          const token = jwt.sign(
            {
              email: email,
            },
            secretKey,
            { expiresIn: "1h" }
          );
          console.log(token);
          return res.status(200).send({ data: "Login Success", token: token });
        } else {
          return res.status(400).send({ data: "Password Incorrect" });
        }
      } else {
        const query = "INSERT INTO users (Email, Password) VALUES (?, ?)";
        db.query(query, [email, hashedPass], (err, data) => {
          if (err) {
            console.log(err);
            return res.status(500).send({ error: err });
          }
          if (data) {
            console.log(data);
            return res.status(200).send({ data: "User created" });
          }
        });
      }
    });
  } catch (error) {
    return res.status(500).send({ err: "Error hashing password" });
  }
});

app.get("/verifytoken", (req, res) => {
  
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send({ error: "Authorization header missing" });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send({ error: "Token missing from Authorization header" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).send({ error: "Token verification failed" });
    }
    return res.status(200).send({ data: decoded });
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
