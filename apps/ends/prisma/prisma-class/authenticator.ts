import { User } from './user'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class Authenticator {
	@ApiProperty({ type: String })
	credentialID: string

	@ApiProperty({ type: String })
	userId: string

	@ApiProperty({ type: String })
	providerAccountId: string

	@ApiProperty({ type: String })
	credentialPublicKey: string

	@ApiProperty({ type: Number })
	counter: number

	@ApiProperty({ type: String })
	credentialDeviceType: string

	@ApiProperty({ type: Boolean })
	credentialBackedUp: boolean

	@ApiPropertyOptional({ type: String })
	transports?: string

	@ApiProperty({ type: () => User })
	user: User
}
