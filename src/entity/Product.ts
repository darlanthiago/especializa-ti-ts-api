import { v4 as uuidv4 } from "uuid";

import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { IsNotEmpty, Length } from "class-validator";

@Entity({ name: "products" })
export class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  @IsNotEmpty()
  @Length(3, 255)
  name: string;

  @Column()
  @IsNotEmpty()
  @Length(3, 255)
  description: string;

  @Column()
  @IsNotEmpty()
  weight: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
