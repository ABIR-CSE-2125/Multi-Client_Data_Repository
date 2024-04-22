import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
const parentDir = path.resolve(__dirname, "..");

// const userFilePath = path.join(__dirname + "/public" + "/users.json");

const router = Router();
router.get("/client/:clientId", (req, res) => {
  let clientId = req.params.clientId;
  const user_name = req.body.username;
  const pass_word = req.body.password;
  const uploadDir = path.join(parentDir, "public", `user-${clientId}`);
  fs.readdir(uploadDir, (err, files) => {
    const filenames = files.map((file) => {
      return file;
    });
    res.render("client.ejs", {
      username: user_name,
      id: clientId,
      files: filenames,
    });
  });
});
export default router;
