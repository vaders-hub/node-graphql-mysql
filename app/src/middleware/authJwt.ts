import { Request, Response } from "express";
import { connection } from "../configure";
import { OkPacket, RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";
import moment from "moment";
import { tzoffset, toIsoDate } from "../utils/date";
import morgan from "morgan";
import { logError } from "../utils/error/errorHandler";

interface Req extends Request {
  [key: number | string]: any;
}

const authJwt = {
  verifyToken: (req: Req, res: Response, next: any) => {
    const key = process.env.TOKEN_KEY || "";
    const { accessToken: token }: any = req.cookies;

    if (!token) {
      morgan.token("customError", () => "No token provided!");
      return res.status(403).send({
        message: "No token provided!",
      });
    }

    // SELECT TIMESTAMPDIFF(MINUTE, '2021-11-18 17:12:18', CURRENT_TIMESTAMP)

    jwt.verify(token, key, (err: any, decoded: any) => {
      morgan.token("customError", () => err.message);
      if (err) {
        return res.status(401).send({
          message: err.message,
        });
      }
      const { memid } = decoded;
      console.log("decoded.memid", memid, decoded.memid);
      const queryString = `SELECT token_date from mymembers where member_id = "${memid}"`;

      connection.query(queryString, (error, result): void => {
        if (error) {
          throw error;
        }

        const rows = result as RowDataPacket[];

        const sTime = toIsoDate(rows[0].token_date);
        const cTime = toIsoDate(new Date(Date.now() - tzoffset));
        const diff = moment(cTime, "YYYY-MM-DD HH:mm:ss").diff(
          moment(sTime, "YYYY-MM-DD HH:mm:ss")
        );
        console.log("rows", sTime, cTime, diff / 3600 / 1000);
        next();
      });
    });
  },
};

export default authJwt;
