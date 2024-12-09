import { IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator"

export class CreateProductDto {


    @IsString({ message: 'El nombre debe ser un string' })
    @MinLength(5, { message: 'El largo minimo del nombre deben ser 5 caracteres' })
    @MaxLength(50, { message: 'El largo maximo del nombre deben ser 50 caracteres' })
    @IsNotEmpty()
    name: string

    @IsString({ message: 'El nombre debe ser un string' })
    @MinLength(5, { message: 'El largo minimo del nombre deben ser 5 caracteres' })
    @MaxLength(500, { message: 'El largo maximo del nombre deben ser 500 caracteres' })
    @IsNotEmpty()
    description: string

    @IsString({ message: 'El link de imagen debe ser un string' })
    @MinLength(5, { message: 'El largo minimo del nombre deben ser 5 caracteres' })
    @MaxLength(200, { message: 'El largo maximo del nombre deben ser 200 caracteres' })
    @IsNotEmpty()
    image: string

    @IsNotEmpty()
    @IsNumber()
    @Min(0, { message: 'El monto minimo debe ser 0 pesos' })
    price: number


}
