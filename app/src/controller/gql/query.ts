import { Request, Response } from "express";
import { queryResult } from "../../utils/query";

export default {
  queryBBS: async (req: Request, res: Response): Promise<any> => {
    const queryString = `SELECT * FROM mybbs`;

    try {
      const result = await queryResult(queryString);
      return { code: "1111", data: result };
    } catch (e) {
      console.warn(e);
    }
  },
};
