import { ReactNode } from "react";
import styles from "./Card.module.css";

type CardProps = {
  children: ReactNode | ReactNode[];
};

export const Card = ({ children }: CardProps) => {
  return <div className={styles.card}>{children}</div>;
};
