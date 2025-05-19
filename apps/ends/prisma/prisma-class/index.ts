import { User as _User } from './user'
import { Account as _Account } from './account'
import { Session as _Session } from './session'
import { VerificationToken as _VerificationToken } from './verification_token'
import { Authenticator as _Authenticator } from './authenticator'

export namespace PrismaModel {
	export class User extends _User {}
	export class Account extends _Account {}
	export class Session extends _Session {}
	export class VerificationToken extends _VerificationToken {}
	export class Authenticator extends _Authenticator {}

	export const extraModels = [
		User,
		Account,
		Session,
		VerificationToken,
		Authenticator,
	]
}
