import { IsString } from "class-validator";

export class EmailUser {
    @IsString()
    email: string
}