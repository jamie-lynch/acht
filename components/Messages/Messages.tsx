import { useCallback, useEffect, useState } from "react";
import { SendMessage } from "../SendMessage";
import { MessageBox } from "../MessageBox";
import { Message as MessageType } from "../../@types/Message";

export const Messages = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch("/api/message");
      const data = (await response.json()) as MessageType[];

      if (response.status !== 200) return setError(await response.text());

      setMessages(data);
      setError(null);
    } catch (e) {
      if (typeof e === "string") {
        setError(e);
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <>
      <SendMessage fetchMessages={fetchMessages} />
      <MessageBox messages={messages} error={error} />
    </>
  );
};
