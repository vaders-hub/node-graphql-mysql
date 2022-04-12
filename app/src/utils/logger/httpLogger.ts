import morgan from "morgan";
import json from "morgan-json";
import logger from "./logger";

const format = json({
  method: ":method",
  url: ":url",
  status: ":status",
  contentLength: ":res[content-length]",
  responseTime: ":response-time",
  customError: ":customError",
});

const httpLogger = morgan(format, {
  stream: {
    write: (message: any) => {
      const {
        method,
        url,
        status,
        contentLength,
        responseTime,
        customError = "",
      } = JSON.parse(message);

      logger.error("HTTP Access Log", {
        timestamp: new Date().toString(),
        method,
        url,
        status: Number(status),
        contentLength,
        responseTime: Number(responseTime),
        customError,
      });
    },
  },
});

export default httpLogger;
