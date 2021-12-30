import styles from "./ErrorMessage.module.css";

type ErrorMessageProps = {
  message: string | null;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  return <div className={styles.error}>{message}</div>;
};
