import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
const parentDir = path.resolve(__dirname, "..");
const userFilePath = path.join(parentDir + "/public" + "/users.json");

const router = Router();
router.post("/login", (req, res) => {
  console.log("I am in login");
  console.log(req.body);
  const user_name = req.body.username;
  const pass_word = req.body.password;
  fs.readFile(userFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal server error");
    }
    let users = [];
    try {
      users = JSON.parse(data);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return res.status(500).send("Internal server error");
    }
    let foundUser = false;
    for (let i = 0; i < users.length; i++) {
      const user_data = JSON.parse(users[i]);
      if (user_data.user === user_name) {
        foundUser = true;
        if (user_data.pass === pass_word) {
          return res.redirect(`/client/${user_data.id}`);
        } else {
          return res.render("login.ejs", { error: "Wrong password" });
        }
      }
    }
    if (!foundUser) {
      return res.render("register.ejs", { error: "New user, please sign up" });
    }
  });
});

export default router;
