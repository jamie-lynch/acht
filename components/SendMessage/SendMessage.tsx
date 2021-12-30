import styles from "./SendMessage.module.css";
import { Card } from "../Card";
import { ChangeEvent, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";

type SendMessageProps = {
  fetchMessages: () => void;
};

export const SendMessage = ({ fetchMessages }: SendMessageProps) => {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<null | string>(null);

  const handleSend = async () => {
    try {
      const response = await fetch("api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author,
          message,
        }),
      });

      if (response.status !== 200) return setError(await response.text());

      setMessage("");
      setError(null);
      fetchMessages();
    } catch (e: unknown) {
      if (typeof e === "string") {
        setError(e);
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value);
  };

  return (
    <Card>
      <div className={styles.input}>
        <label htmlFor="name">Name</label>
        <input id="name" onChange={handleAuthorChange} value={author}></input>
      </div>
      <div className={styles.input}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          placeholder="Enter you message here"
          onChange={handleMessageChange}
          value={message}
          rows={5}
        ></textarea>
      </div>
      <button onClick={handleSend}>Send</button>
      <ErrorMessage message={error} />
    </Card>
  );
};
