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

const deleteBBS = async (req: Request, res: Response): Promise<any> => {
  const { bbs_id, member_id } = req.body;
  const queryString = `DELETE FROM mybbs WHERE bbs_id="${bbs_id}" AND member_id="${member_id}"`;

  try {
    const result = await queryResult(queryString);
    res.json({ data: result });
  } catch (e) {
    console.log("error", e);
  }
};

const writeBBS = async (req: Request, res: Response): Promise<any> => {
  const { member_id, title, body } = req.body;
  const queryString = `INSERT INTO mybbs(member_id, title, body)
          VALUES("${member_id}", "${title}", "${body}")`;

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

export { readBBS, writeBBS, deleteBBS, getCookie, deleteCookie, testToken };
