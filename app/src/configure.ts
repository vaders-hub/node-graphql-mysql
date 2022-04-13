import express, { Request, Response, NextFunction, Application } from "express";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import fs from "fs";
import mysql from "mysql2";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
import cookieParser from "cookie-parser";
import httpLogger from "./utils/logger/httpLogger";
import morganMiddleware from "./utils/logger/morganMiddleware";
import HttpException from "./utils/exceptions";
import {} from "../global";
import gplTypeDefs from "./interface/gql/schema";
import Resolvers from "./controller/gql/index";

try {
  dotenv.config({
    path: path.resolve(
      String(process.env.NODE_ENV).trim() === "development"
        ? ".env.dev"
        : ".env"
    ),
  });
} catch (e) {
  console.warn(e);
}

const app: Application = express();
const PORT: number | string = process.env.PORT || 443;
const connection: mysql.Connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: "Z",
});

global.db = connection;

type Cors = {
  origin: string[];
  credentials: boolean;
};

const corsOptions: Cors = {
  credentials: true,
  origin: [
    "http://localhost:3000",
    "http://localhost:3002",
    "http://localhost:3008",
    "https://studio.apollographql.com",
  ],
};

const options = {
  key: fs.readFileSync(path.join(__dirname + "/../certs/key.pem")),
  cert: fs.readFileSync(path.join(__dirname + "/../certs/cert.pem")),
};

const authenticationMethod = (token: any) => {
  return { user: "apollo" };
};

const apolloServer = new ApolloServer({
  // playground: true,

  // context: async ({ req, res }) => {
  //   const token = req?.cookies["jwt_token"];

  //   const context = {
  //     req,
  //     res,
  //     user: { admin: true },
  //   };

  //   const user: any = token ? await authenticationMethod({ token }) : null;

  //   if (!user?.error) {
  //     context.user = user;
  //   }

  //   return context;
  // },
  typeDefs: gplTypeDefs,
  resolvers: Resolvers,
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morganMiddleware);
app.use(function (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

routes(app);

export { apolloServer, PORT, connection, app, options };
