import { Request, Response, Router } from "express";
import { Client } from "../entities/Client";
import { getRepository, MoreThan } from "typeorm";
import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";
import { v4 } from "uuid";
import { sub } from "date-fns";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const t = sub(new Date(), { minutes: 30 });
  const options = req.query.active
    ? { where: { lastActive: MoreThan(t.getTime()) } }
    : {};

  getRepository(Client)
    .find(options)
    .then((clients) => res.json(clients))
    .catch((err) => res.status(500).send(err.message));
});

router.post("/", (req: Request, res: Response) => {
  const client = new Client();
  client.name = (req.query.name as string) || "Anonymous";
  client.uuid = v4();

  getRepository(Client)
    .save(client)
    .then((client) => res.json(client))
    .catch((err) => res.status(500).send(err.message));
});

router.put("/:id", (req: Request, res: Response) => {
  const repo = getRepository(Client);

  repo
    .findOneOrFail({ uuid: req.params.id })
    .then((client) => {
      const name = req.query.name as string;
      if (name) {
        client.name = name;
      }
      return repo.save(client);
    })
    .then((result) => res.json(result))
    .catch((err) => {
      if (err instanceof EntityNotFoundError) {
        return res.status(404).send("No client was found with that id");
      } else {
        return res.status(500).send(err.message);
      }
    });
});

router.put("/heartbeat/:id", (req: Request, res: Response) => {
  const repo = getRepository(Client);

  repo
    .findOneOrFail({ uuid: req.params.id })
    .then((client) => {
      client.lastActive = Date.now();
      return repo.save(client);
    })
    .then((result) => res.json(result))
    .catch((err) => {
      if (err instanceof EntityNotFoundError) {
        return res.status(404).send("No client was found with that id");
      } else {
        return res.status(500).send(err.message);
      }
    });
});

router.delete("/:id", (req: Request, res: Response) => {
  getRepository(Client)
    .delete({ uuid: req.params.id })
    .then((result) => {
      if (result.affected > 0) {
        return res.send("ok");
      } else {
        return res.status(404).send("No client was found with that id");
      }
    });
});

export default router;
