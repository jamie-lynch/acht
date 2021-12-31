import type { NextApiRequest, NextApiResponse } from "next";
import type { Message } from "../../@types/Message";
import { messages as fakeMessages } from "../../fixtures/messages";
import { v4 } from "uuid";

const messages: Message[] = fakeMessages;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | Message[]>
) {
  switch (req.method) {
    case "GET":
      return getAll(res);
    case "POST":
      return newMessage(req, res);
    default:
      return res
        .status(405)
        .send("This endpoint only supports GET or POST requests");
  }
}

const getAll = (res: NextApiResponse<string | Message[]>) => {
  res.status(200).json(messages);
};

const newMessage = (
  req: NextApiRequest,
  res: NextApiResponse<string | Message[]>
) => {
  const message = {
    id: v4(),
    timestamp: Date.now(),
    author: req.body.author,
    message: req.body.message,
  };

  messages.push(message);
  return res.status(200).send("Message sent successfully");
};
