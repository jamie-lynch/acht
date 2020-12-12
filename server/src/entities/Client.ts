import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { FindOperator } from "typeorm";
import { Message } from "./Message";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  name: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    transformer: {
      from: (value?: Date) =>
        !value
          ? value
          : typeof value === "number"
          ? value
          : Math.round(value.getTime()),
      to: (value?: any) => {
        if (value) {
          if (typeof value === "number") {
            return new Date(value);
          } else if (value instanceof FindOperator) {
            if (typeof value.value === "number") {
              (value as any)._value = new Date(value.value);
            }

            return value;
          }
        }
      },
    },
  })
  lastActive: number;

  @OneToMany(() => Message, (message) => message.author)
  messages: Message[];
}
