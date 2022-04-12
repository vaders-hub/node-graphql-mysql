import express, { Request, Response } from "express";
import { queryResult } from "../utils/query";
import { authJwt } from "../middleware/";

const router = express.Router();

router.use(authJwt.verifyToken);

router.get("/read", async (req: Request, res: Response): Promise<any> => {
  const queryString = `SELECT * FROM mybbs`;

  try {
    const result = await queryResult(queryString);
    res.json({ data: result });
  } catch (e) {
    console.log("error", e);
  }
});

router.post("/write", async (req: Request, res: Response): Promise<any> => {
  const { title, body } = req.body;
  const queryString = `INSERT INTO mybbs(title, body)
        VALUES("${title}", "${body}")`;

  try {
    const result = await queryResult(queryString);
    res.json({ data: result });
  } catch (e) {
    console.log("error", e);
  }
});

router.get("/get-cookie", async (req: Request, res: Response): Promise<any> => {
  try {
    let randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie("cookieName", randomNumber, {
      maxAge: 900000,
      httpOnly: true,
      secure: true,
    });
    res.send({ message: "cookie set" });
  } catch (e) {
    console.log("error", e);
  }
});

router.get("/del-cookie", async (req: Request, res: Response): Promise<any> => {
  try {
    res.clearCookie("cookieName");
    res.send({ message: "cookie deleted" });
  } catch (e) {
    console.log("error", e);
  }
});

router.get("/test-token", async (req: Request, res: Response): Promise<any> => {
  console.log("test token");
  res.send("done");
});

export { router as bbsRouter };
