import { User } from './user'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class LoginHistory {
	@ApiProperty({ type: String })
	id: string

	@ApiProperty({ type: String })
	userId: string

	@ApiProperty({ type: String })
	platform: string

	@ApiPropertyOptional({ type: String })
	device?: string

	@ApiPropertyOptional({ type: String })
	fingerprint?: string

	@ApiPropertyOptional({ type: String })
	userAgent?: string

	@ApiProperty({ type: String })
	ip: string

	@ApiProperty({ type: Boolean })
	success: boolean

	@ApiPropertyOptional({ type: String })
	errorMsg?: string

	@ApiProperty({ type: Date })
	createdAt: Date

	@ApiProperty({ type: Date })
	updatedAt: Date

	@ApiProperty({ type: () => User })
	user: User
}
