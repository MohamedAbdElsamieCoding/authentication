import express from "express";
const app = express();
const port = 3000;
const users = [];

app.use(express.json());
app.post("/register", () => {});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
