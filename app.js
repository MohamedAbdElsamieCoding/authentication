import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;
const users = [];

app.use(express.json());
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = users.find((data) => data.email === email);
    if (findUser) {
      return res.status(400).send({ message: "Email or password are wrong" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.status(201).send({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = users.find((data) => data.email === email);
    if (!findUser) {
      return res.status(400).send({ message: "Email or password are wrong" });
    }
    const passwordMatched = bcrypt.compare(password, users.password);
    if (!passwordMatched) {
      return res.status(400).send({ message: "Email or password are wrong" });
    }
    res.status(200).send({ message: "Login successful" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
