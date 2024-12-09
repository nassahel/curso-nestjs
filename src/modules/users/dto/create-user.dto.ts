import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @MaxLength(50, { message: 'El nombre debe tener xomo maximo 50 caracteres' })
    @MinLength(3, { message: 'El nombre debe tener por lo menos 3 caracteres' })
    name: string;

    @IsString({ message: 'El apellido debe ser una cadena de texto' })
    @MaxLength(50, { message: 'El apellido debe tener xomo maximo 50 caracteres' })
    @MinLength(3, { message: 'El apellido debe tener por lo menos 3 caracteres' })
    lastName: string;

    @IsString({ message: 'El email debe ser una cadena de texto' })
    @MaxLength(50, { message: 'El email debe tener xomo maximo 50 caracteres' })
    @MinLength(3, { message: 'El email debe tener por lo menos 3 caracteres' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString({ message: 'La direccion debe ser una cadena de texto' })
    @MaxLength(50, { message: 'La direccion debe tener xomo maximo 50 caracteres' })
    @MinLength(3, { message: 'La direccion debe tener por lo menos 3 caracteres' })
    address: string;

    @IsString({ message: 'El telefono debe ser una cadena de texto' })
    @MaxLength(100, { message: 'El telefono debe tener xomo maximo 50 caracteres' })
    @MinLength(3, { message: 'El telefono debe tener por lo menos 3 caracteres' })
    phone: string;

}
