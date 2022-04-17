import https from "https";
import { apolloServer, PORT, connection, app, options } from "./configure";
import { logError, isOperationalError } from "./utils/error/errorHandler";

connection.connect(function (err) {
  if (err) {
    console.error("Error while connect to DB: " + err.stack);
    return;
  }
  initServer();
});

const initServer = async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  const httpsServer = https.createServer(options, app);
  httpsServer.listen(PORT, (): void => {
    console.log(`Server Running here 👉 https://localhost:${PORT}`);
  });
  app.listen(4002, () => {
    console.log(`Server Running here 👉 http://localhost:${PORT}`);
  });
};

process.on("unhandledRejection", (error) => {
  throw error;
});

process.on("uncaughtException", (error) => {
  logError(error);

  if (!isOperationalError(error)) {
    process.exit(1);
  }
});
