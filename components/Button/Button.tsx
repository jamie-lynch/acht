import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabledTip: string;
}

export const Button = ({ children, disabledTip, ...props }: ButtonProps) => (
  <button className={styles.button} {...props}>
    {children}
    <span className={styles.tooltip}>{disabledTip}</span>
  </button>
);
