export default {
  setMessage: () => {
    return "message";
  },
  createBBS: (
    parent: Record<string, unknown>,
    args: Record<string, unknown>
  ) => {
    console.log("new post", parent, args);
    return true;
  },
};
