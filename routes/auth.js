import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
const parentDir = path.resolve(__dirname, "..");

// const userFilePath = path.join(__dirname + "/public" + "/users.json");

const router = Router();
router.post("/auth", (req, res) => {
  switch (req.body.choice) {
    case "login":
      res.render("login.ejs");
      break;
    case "register":
      res.render("register.ejs");
      break;
    default:
      res.render("error_auth.ejs");
      break;
  }
  res.render("index.ejs");
});
export default router;
