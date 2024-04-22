import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
const parentDir = path.resolve(__dirname, "..");

const userFilePath = path.join(parentDir + "/public" + "/users.json");

const router = Router();
router.post("/register", (req, res) => {
  console.log("I am in auth");
  const user_name = req.body.username;
  const pass_word = req.body.password;
  let id;
  fs.readFile(userFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    let users = [];
    try {
      users = JSON.parse(data);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return;
    }
    let userdata = {
      id: users.length + 1,
      user: user_name,
      pass: pass_word,
    };
    id = userdata.id;
    // Append the new user data to the array
    let serialisedUserData = JSON.stringify(userdata);
    users.push(serialisedUserData);

    // Convert the updated array back to JSON
    const updatedJsonData = JSON.stringify(users);
    fs.writeFile(userFilePath, updatedJsonData, (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log("Data has been written to users.json");
      }
    });
    const directoryPath = path.join(parentDir + "/public" + `/user-${id}`);
    fs.mkdir(directoryPath, { recursive: true }, (err) => {
      if (err) {
        console.error("Error creating directory:", err);
        return;
      }
      console.log("Directory created successfully");
    });
    console.log(id);
    res.redirect(`/client/${id}`);
  });
});
export default router;
