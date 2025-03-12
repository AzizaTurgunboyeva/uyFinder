import { IsString } from "class-validator";


export class SignIn {
   @IsString()
   email:string
   @IsString()
   password:string
}
