import http from "http";
import { initialise } from "./utils/initialise";
import { normalizePort, onError, onListening } from "./utils/connection";
import express, { Response, Request } from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import createError from "http-errors";
import clientRouter from "./routes/client";
import messageRouter from "./routes/message";
import HttpException from "./exceptions/HttpException";
import { createConnection } from "typeorm";

initialise()
  .then((config) => {
    return createConnection(config);
  })
  .then(() => {
    const port = normalizePort(process.env.PORT || "80");

    const app = express();

    app.use(morgan(process.env.LOG_STYLE || "dev"));
    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, "public")));

    app.use("/client", clientRouter);
    app.use("/message", messageRouter);

    app.use((req, res, next) => {
      next(createError(404));
    });

    app.use(
      (err: HttpException, req: Request, res: Response, next: () => void) => {
        if (process.env.APP_ENV === "dev") {
          return res.status(err.status || 500).send(err.message);
        } else {
          return res.status(err.status || 500).send("An error occurred");
        }
      }
    );

    app.set("port", port);

    const server = http.createServer(app);

    server.listen(port);
    server.on("error", (error) => onError(error, port));
    server.on("listening", () => onListening(server));
  });
