import morgan from "morgan";
import chalk from "chalk";
import logger from "./logger";

const loggerStream: morgan.StreamOptions = {
  write: (message) =>
    logger.error(message.substring(0, message.lastIndexOf("\n"))),
};

const morganMiddleware = morgan(
  chalk.yellow(
    ":method :url :status :res[content-length]- :response-time ms :status"
  ),
  { stream: loggerStream, skip: () => !process.env.NODE_ENV }
);

export default morganMiddleware;
