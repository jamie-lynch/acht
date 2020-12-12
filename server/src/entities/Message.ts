import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { FindOperator } from "typeorm";
import { Client } from "./Client";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

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
  timestamp: number;

  @ManyToOne(() => Client, (client) => client.messages)
  author: Client;

  // TODO: Add a recipient to allow direct messages

  @Column({ type: "text" })
  message: string;
}
