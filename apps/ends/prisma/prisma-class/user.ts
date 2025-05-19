import { Account } from './account'
import { Session } from './session'
import { Authenticator } from './authenticator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class User {
	@ApiProperty({ type: String })
	id: string

	@ApiPropertyOptional({ type: String })
	name?: string

	@ApiProperty({ type: String })
	email: string

	@ApiPropertyOptional({ type: Date })
	emailVerified?: Date

	@ApiPropertyOptional({ type: String })
	image?: string

	@ApiPropertyOptional({ type: String })
	role?: string = 'USER'

	@ApiProperty({ isArray: true, type: () => Account })
	accounts: Account[]

	@ApiProperty({ isArray: true, type: () => Session })
	sessions: Session[]

	@ApiProperty({ isArray: true, type: () => Authenticator })
	Authenticator: Authenticator[]

	@ApiProperty({ type: Date })
	createdAt: Date

	@ApiProperty({ type: Date })
	updatedAt: Date
}
