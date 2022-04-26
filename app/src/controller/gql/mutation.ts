import { queryResult } from "../../utils/query";

export default {
  setMessage: () => {
    return "message";
  },
  createBBS: async (
    parent: Record<string, unknown>,
    args: Record<string, unknown>
  ) => {
    const {
      payload: { member_id, title, body },
    }: any = args;
    const queryString = `INSERT INTO mybbs(member_id, title, body)
          VALUES("${member_id}", "${title}", "${body}")`;

    try {
      const result = await queryResult(queryString);
      if (result) {
        return { code: "0000" };
      }
    } catch (e) {
      console.log("error", e);
    }
  },
};
