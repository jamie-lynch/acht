import { InputHTMLAttributes } from "react";
import styles from "./TextArea.module.css";

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  rows: number;
}

export const TextArea = ({ id, label, ...props }: TextAreaProps) => (
  <div className={styles.input}>
    <label htmlFor={id}>{label}</label>
    <textarea id={id} {...props}></textarea>
  </div>
);
