import { IsArray, IsEmail, IsInt, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Min, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

//TODO реализовать DTO для /orders
export class Ticket {
  @IsString()
  @IsNotEmpty()
  film: string;

  @IsString()
  @IsNotEmpty()
  session: string;

  @IsString()
  daytime: string;

  @IsString()
  day: string;

  @IsString()
  time: string;

  @IsInt()
  @Min(1)
  row: number;

  @IsInt()
  @Min(1)
  seat: number;

  @IsNumber()
  price: number;
}

export class Contacts {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;
}

export class Order extends Contacts {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Ticket)
  @IsNotEmpty()
  tickets: Ticket[];
}

export class TicketResult extends Ticket {
  @IsString()
  id: string;
}
