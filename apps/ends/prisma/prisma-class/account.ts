import { User } from './user'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class Account {
	@ApiProperty({ type: String })
	userId: string

	@ApiProperty({ type: String })
	type: string

	@ApiProperty({ type: String })
	provider: string

	@ApiProperty({ type: String })
	providerAccountId: string

	@ApiPropertyOptional({ type: String })
	refresh_token?: string

	@ApiPropertyOptional({ type: String })
	access_token?: string

	@ApiPropertyOptional({ type: Number })
	expires_at?: number

	@ApiPropertyOptional({ type: String })
	token_type?: string

	@ApiPropertyOptional({ type: String })
	scope?: string

	@ApiPropertyOptional({ type: String })
	id_token?: string

	@ApiPropertyOptional({ type: String })
	session_state?: string

	@ApiProperty({ type: Date })
	createdAt: Date

	@ApiProperty({ type: Date })
	updatedAt: Date

	@ApiProperty({ type: () => User })
	user: User
}
