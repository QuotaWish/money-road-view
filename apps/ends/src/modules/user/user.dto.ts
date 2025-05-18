import { IsNotEmpty } from 'class-validator'

export class UserRegisterProps {
  @IsNotEmpty()
  account: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  type: string
}