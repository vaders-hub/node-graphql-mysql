import { Request, Response } from "express";
import { queryResult } from "../utils/query";

const searchTerm = async (
  req: Request,
  res: Response & any
): Promise<any> => {
  const { memid } = req.body;
  const queryString = `SELECT * FROM mymembers where id = ${memid}`;

  try {
    const result = await queryResult(queryString);
    res.json({ code: "1111", data: result });
  } catch (e) {
    console.warn(e);
  }
};

export {  searchTerm };
