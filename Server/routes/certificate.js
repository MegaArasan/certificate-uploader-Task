import multer from "multer";
import express from "express";
import { client } from "../server.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

//middleware
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      console.log("only image & pdf file supported");
      cb(null, false);
    }
  },
}).single("profimg");

router.route("/addcertificate").post(upload, async (req, res) => {
  try {
    const data = {
      cerificateName: req.body.cerificateName,
      issuer: req.body.issuer,
      certificate: req.file.filename,
    };
    console.log(data);
    const certify = await client
      .db("organisation")
      .collection("certificates")
      .insertOne(data);
    res.json({
      status: 200,
      msg: "Certificate added successfully",
      info: certify,
    });
  } catch (error) {
    console.log(error);
  }
}); 

export const certificateRouter = router;
