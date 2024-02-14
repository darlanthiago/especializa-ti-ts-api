import { v4 as uuidv4 } from "uuid";

import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "products" })
export class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  weight: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
