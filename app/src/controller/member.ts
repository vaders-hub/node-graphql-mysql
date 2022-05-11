import { Request, Response } from "express";
import { queryResult } from "../utils/query";
import jwt from "jsonwebtoken";
import encrypt from "../utils/encrypt";

const listMember = async (req: Request, res: Response): Promise<any> => {
  const queryString = `SELECT member_id FROM mymembers`;
  try {
    const result = await queryResult(queryString);
    res.json({ body: result });
  } catch (e) {
    console.log("error", e);
  }
};

const enc = async (req: Request, res: Response): Promise<any> => {
  const { mempw } = req.body;
  try {
    const result = await encrypt.cipher(mempw);
    res.json({ body: result });
  } catch (e) {
    console.log("error", e);
  }
};

const dec = async (req: Request, res: Response): Promise<any> => {
  const { memid } = req.body;
  try {
    const result = await encrypt.deCipher(memid);
    res.json({ body: result });
  } catch (e) {
    console.log("error", e);
  }
};

const findUser = async (req: Request, res: Response): Promise<any> =>  {
  const { memid } = req.query;
  const queryStringSearch = `SELECT * from mymembers where member_id = "${memid}"`;
  try {
    const result = await queryResult(queryStringSearch);
    
    if (result.length > 0) {
      res.json({ code: "0000", data:result[0].member_id });
    } else {
      res.json({ code: "0000", data:result });
    }
    
  } catch (e) {
    console.warn(e);
  }
}

const signup = async (req: Request, res: Response): Promise<any> => {
  const { memid, mempw } = req.body;
  const { salt, hashed } = await encrypt.procEncryption(mempw);

  const queryStringSearch = `SELECT * from mymembers where member_id = "${memid}"`;
  try {
    const existResult = await queryResult(queryStringSearch);
    if (existResult.length > 0) {
      res.json({ code: "0000", message: "id exist" });
      return;
    }
  } catch (e) {
    console.warn(e);
  }

  const queryStringInsert = `INSERT INTO mymembers(member_id, member_pw, salt)
        VALUES("${memid}", "${hashed}", "${salt}")`;
  try {
    const result = await queryResult(queryStringInsert);
    if (result) {
      res.json({ code: "1111", message: "join success" });
    }
  } catch (e) {
    console.log(e);
  }
};

const signin = async (req: Request, res: Response): Promise<any> => {
  const { memid, mempw } = req.body;
  const queryString = `SELECT salt, member_pw from mymembers where member_id = "${memid}"`;

  try {
    const loginResult = await queryResult(queryString);

    if (loginResult.length === 0) {
      res.cookie("accessToken", "null");
      res.json({ code: "0000", body: "login info mismatched" });
      return;
    }

    const { salt, member_pw } = loginResult[0];

    if (salt && member_pw) {
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

        const queryStringUpdate = `update mymembers
            set token_date = CURRENT_TIMESTAMP
            where member_id = '${memid}'`;

        try {
          const updateResult = await queryResult(queryStringUpdate);
          if (updateResult) {
            res.cookie("accessToken", accessToken, cookieCoption);
            res.cookie("refreshToken", refreshToken, cookieCoption);
            res.json({ code: "1111", message: "login success" });
          }
        } catch (e) {
          console.warn(e);
        }
      }
    }
  } catch (e) {
    console.log("error", e);
  }
};

export { listMember, enc, dec, findUser, signup, signin };
