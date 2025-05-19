import { User } from './user'
import { ApiProperty } from '@nestjs/swagger'

export class Session {
	@ApiProperty({ type: String })
	sessionToken: string

	@ApiProperty({ type: String })
	userId: string

	@ApiProperty({ type: Date })
	expires: Date

	@ApiProperty({ type: () => User })
	user: User

	@ApiProperty({ type: Date })
	createdAt: Date

	@ApiProperty({ type: Date })
	updatedAt: Date
}
