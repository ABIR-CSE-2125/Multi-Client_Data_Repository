import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
const parentDir = path.resolve(__dirname, "..");

// const userFilePath = path.join(__dirname + "/public" + "/users.json");

const router = Router();
router.post("/addFile/:clientId", (req, res) => {
  const id = req.params.clientId;
  const directoryPath = path.join(parentDir + "/public" + `/user-${id}`);
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, directoryPath);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({
    storage: storage,
  }).single("file");
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send("Multer error: " + err.message);
    } else if (err) {
      return res.status(500).send("Unknown error: " + err.message);
    }
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }
    res.redirect(`/client/${id}`);
  });
});
export default router;
