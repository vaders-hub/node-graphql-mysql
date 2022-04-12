import express, { Application, Request, Response } from "express";
import { indexRouter } from "./routes/index";
import { bbsRouter } from "./routes/bbs";
import { membersRouter } from "./routes/members";

const router = express.Router();

const routes = (app: Application): void => {
  app.all("/*", function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next(); // http://expressjs.com/guide.html#passing-route control
  });
  router.get("/", indexRouter);
  app.use("/bbs", bbsRouter);
  app.use("/members", membersRouter);
  app.use(router);
};

export default routes;
