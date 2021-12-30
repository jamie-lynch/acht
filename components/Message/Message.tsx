import { Message as MessageType } from "../../@types/Message";
import styles from "./Message.module.css";

export const Message = ({ timestamp, author, message }: MessageType) => (
  <li className={styles.message}>
    <div className={styles.author}>{author}</div>
    <div className={styles.text}>{message}</div>
    <div className={styles.time}>{formatDate(timestamp)}</div>
  </li>
);

const formatDate = (timestamp: number) => {
  const t = new Date(timestamp);
  return `${t.getHours()}:${t.getMinutes()}`;
};
