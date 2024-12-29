import * as bcrypt from 'bcrypt'


export const bcryptHash =  (pass: string) => {
    const hashedPassword =  bcrypt.hash(pass, 10);
    return hashedPassword
}

export const bcryptCompare = (pass: string, hashedPass: string) => {
    const isMatch = bcrypt.compare(pass, hashedPass);
    return isMatch
}