import express from "express";
import { exec } from "child_process";
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/perform-new-rating", (req, res) => {
  exec("node downloadusertracks.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send("Server error");
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    return res.send("Success");
  });
});

app.listen(5500, () => {
  console.log("Server started on port 5500");
});
