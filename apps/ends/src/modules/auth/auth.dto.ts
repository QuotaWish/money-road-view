import { IsNotEmpty } from 'class-validator'

export class UserLoginProps {
  @IsNotEmpty()
  account: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  type: string

  @IsNotEmpty()
  device: string
}

export class UserRegisterProsp {
  @IsNotEmpty()
  account: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  type: string
}