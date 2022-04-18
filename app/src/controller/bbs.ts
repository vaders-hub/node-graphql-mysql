import { Request, Response } from "express";
import { queryResult } from "../utils/query";

const readBBS = async (
  req: Request,
  res: Response & any,
  next: any
): Promise<any> => {
  const queryString = `SELECT * FROM mybbs`;

  try {
    const result = await queryResult(queryString);
    res.json({ code: "1111", data: result });
    // res.result = result;
    // next();
  } catch (e) {
    console.warn(e);
  }
};

const writeBBS = async (req: Request, res: Response): Promise<any> => {
  const { title, body } = req.body;
  const queryString = `INSERT INTO mybbs(title, body)
          VALUES("${title}", "${body}")`;

  try {
    const result = await queryResult(queryString);
    res.json({ data: result });
  } catch (e) {
    console.log("error", e);
  }
};

const getCookie = async (req: Request, res: Response): Promise<any> => {
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
};

const deleteCookie = async (req: Request, res: Response): Promise<any> => {
  try {
    res.clearCookie("cookieName");
    res.send({ message: "cookie deleted" });
  } catch (e) {
    console.log("error", e);
  }
};

const testToken = async (req: Request, res: Response): Promise<any> => {
  const { title, body } = req.body;
  const queryString = `INSERT INTO mybbs(title, body)
            VALUES("${title}", "${body}")`;

  try {
    const result = await queryResult(queryString);
    res.json({ data: result });
  } catch (e) {
    console.log("error", e);
  }
};

export { readBBS, writeBBS, getCookie, deleteCookie, testToken };
