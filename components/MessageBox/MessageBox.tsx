import { Message as MessageType } from "../../@types/Message";
import { Message } from "../Message";
import { Card } from "../Card";
import styles from "./MessageBox.module.css";
import { ErrorMessage } from "../ErrorMessage";

type MessageBoxProps = {
  messages: MessageType[];
  error: string | null;
};

export const MessageBox = ({ messages, error }: MessageBoxProps) => {
  return (
    <Card>
      <ul className={styles.list}>
        {messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
      </ul>
      <ErrorMessage message={error} />
    </Card>
  );
};
