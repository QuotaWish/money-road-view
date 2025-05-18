import { IsNotEmpty } from 'class-validator'

export class UserLoginProps {
  @IsNotEmpty()
  account: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  type: string
}