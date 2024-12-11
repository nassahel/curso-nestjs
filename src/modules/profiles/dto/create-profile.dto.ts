import { IsString, IsUUID } from "class-validator"

export class CreateProfileDto {

    @IsString()
    biography: string

    @IsUUID()
    @IsString({message: 'Tiene q ser un string'})
    userId: string    
}
