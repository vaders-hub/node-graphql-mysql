import express, { Request, Response } from "express";
import { authJwt } from "../middleware/";
import {
  readBBS,
  writeBBS,
  getCookie,
  deleteCookie,
  testToken,
} from "../controller/bbs";

const router = express.Router();

// router.use(authJwt.verifyToken);

router.get("/read", readBBS);
router.post("/write", writeBBS);
router.get("/get-cookie", getCookie);
router.get("/del-cookie", deleteCookie);
router.get("/test-token", testToken);

export { router as bbsRouter };
