import { Card } from "../Card";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TextArea } from "../TextArea";
import { TextInput } from "../TextInput";
import { Button } from "../Button";

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

  const handleMessageInputKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.code === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Card>
      <TextInput
        id="name"
        label="Name"
        onChange={handleAuthorChange}
        value={author}
      />
      <TextArea
        id="message"
        label="Message"
        placeholder="Enter you message here"
        onChange={handleMessageChange}
        onKeyDown={handleMessageInputKeyDown}
        value={message}
        rows={5}
      />
      <Button onClick={handleSend}>Send</Button>
      <ErrorMessage message={error} />
    </Card>
  );
};
