import { IsNotEmpty } from 'class-validator'

export class UserLoginProps {
  @IsNotEmpty()
  account: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  type: string

  @IsNotEmpty()
  fingerprint: string

  @IsNotEmpty()
  platform: string
}

export class UserRegisterProsp {
  @IsNotEmpty()
  account: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  type: string

  @IsNotEmpty()
  fingerprint: string

  @IsNotEmpty()
  platform: string
}