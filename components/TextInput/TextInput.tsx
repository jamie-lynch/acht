import { InputHTMLAttributes } from "react";
import styles from "./TextInput.module.css";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const TextInput = ({ id, label, ...props }: TextInputProps) => (
  <div className={styles.input}>
    <label htmlFor={id}>{label}</label>
    <input id={id} {...props}></input>
  </div>
);
