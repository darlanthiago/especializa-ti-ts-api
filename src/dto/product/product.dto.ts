import { IsNotEmpty, IsNumber, IsUUID, Length } from "class-validator";

export class CreateProductDTO {
  @IsNotEmpty()
  @Length(3, 255)
  name: string;

  @IsNotEmpty()
  @Length(3, 255)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  weight: number;
}

export class UpdateProductDTO extends CreateProductDTO {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
