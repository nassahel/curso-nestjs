import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString({message: 'El nombre debe ser un string'})
    @IsNotEmpty()
    name: string
}
