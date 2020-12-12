import { Request, Response, Router } from "express";
import { Message } from "../entities/Message";
import { Client } from "../entities/Client";
import { getRepository } from "typeorm";
import { v4 } from "uuid";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  getRepository(Message)
    .find({ order: { timestamp: "ASC" } })
    .then((messages) => res.json(messages))
    .catch((err) => res.status(500).send(err.message));
});

router.post("/", (req: Request, res: Response) => {
  const repo = getRepository(Message);
  const message = new Message();
  message.uuid = v4();
  message.message = req.body.message;
  message.timestamp = Date.now();

  getRepository(Client)
    .findOneOrFail({ uuid: req.body.client })
    .then((client) => {
      message.author = client;
      return repo.save(message);
    })
    .then(() => {
      return repo.find({ order: { timestamp: "ASC" } });
    })
    .then((messages) => {
      return res.json(messages);
    })
    .catch((err) => res.status(500).send(err.message));
});

export default router;
