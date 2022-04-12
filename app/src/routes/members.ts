import express, { Request, Response } from "express";
import { connection } from "../configure";
import { OkPacket, RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";
import { queryResult } from "../utils/query";
import encrypt from "../utils/encrypt";
import { Api404Error } from "../utils/error/api404Error";

const router = express.Router();

router.get("/list", async (req: Request, res: Response): Promise<any> => {
  const queryString = `SELECT member_id FROM mymembers`;
  try {
    const result = await queryResult(queryString);
    res.json({ body: result });
  } catch (e) {
    console.log("error", e);
  }
});

router.post("/enc", async (req: Request, res: Response): Promise<any> => {
  const { mempw } = req.body;
  try {
    const result = await encrypt.cipher(mempw);
    res.json({ body: result });
  } catch (e) {
    console.log("error", e);
  }
});

router.post("/dec", async (req: Request, res: Response): Promise<any> => {
  const { memid } = req.body;
  try {
    const result = await encrypt.deCipher(memid);
    res.json({ body: result });
  } catch (e) {
    console.log("error", e);
  }
});

router.post("/signup", async (req: Request, res: Response): Promise<any> => {
  const { memid, mempw } = req.body;
  const { salt, hashed } = await encrypt.procEncryption(mempw);

  const queryString = `INSERT INTO mymembers(member_id, member_pw, salt)
        VALUES("${memid}", "${hashed}", "${salt}")`;

  connection.query(queryString, (error, result): void => {
    if (error) {
      throw error;
    }

    const rows: any = result as RowDataPacket[];
    if (rows.serverStatus === 2) {
      res.json({ message: "가입 성공" });
    }
  });
});

router.post("/signin", async (req: Request, res: Response): Promise<any> => {
  const { memid, mempw } = req.body;
  const queryString = `SELECT salt, member_pw from mymembers where member_id = "${memid}"`;

  try {
    connection.query(queryString, async (error, result): Promise<any> => {
      if (error) {
        throw error;
      }

      const rows: any = result as RowDataPacket[];

      if (rows.length === 0) {
        console.log("not found", memid);
        // throw new Api404Error(`User with id: ${memid}`);
        res.cookie("accessToken", "null");
        res.json({ body: "해당 아이디 없음" });
      }
      if (rows[0]) {
        const { member_id, member_pw, salt } = rows[0];
        const { hashed } = await encrypt.procEncryption(mempw, salt);

        if (member_pw === hashed) {
          const cookieCoption = {
            maxAge: 900000,
            httpOnly: true,
            secure: true,
          };
          const accessToken = jwt.sign(
            { memid },
            process.env.TOKEN_KEY as string,
            {
              expiresIn: 10000,
              issuer: process.env.TOKEN_ISSUER as string,
            }
          );
          const refreshToken = jwt.sign({}, process.env.TOKEN_KEY as string, {
            expiresIn: "14d",
            issuer: process.env.TOKEN_ISSUER as string,
          });

          const queryString = `update mymembers
            set token_date = CURRENT_TIMESTAMP
            where member_id = '${memid}'`;

          connection.query(queryString, (error, result): void => {
            if (error) {
              throw error;
            }
            interface GenericIdentityFnExt {
              [key: number | string]: any;
            }

            const rows: GenericIdentityFnExt = result as RowDataPacket[];
            if (rows.serverStatus === 2) {
              res.cookie("accessToken", accessToken, cookieCoption);
              res.cookie("refreshToken", refreshToken, cookieCoption);
              res.json({ message: "로그인 성공" });
            }
          });
        } else {
          res.json({ message: "로그인 실퍠" });
        }
      }
    });
  } catch (e) {
    console.log("error", e);
  }
});

export { router as membersRouter };
