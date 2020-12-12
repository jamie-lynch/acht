import { Server } from "http";

export const normalizePort = (val: string): number => {
  const port = parseInt(val, 10);

  if (isNaN(port) || !port || port <= 0) {
    return 80;
  }

  return port;
};

export const onError = (error: any, port: number) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
};

export const onListening = (server: Server) => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log(`Listening on ${bind}`);
};
