import { ApiProperty } from '@nestjs/swagger'

export class VerificationToken {
	@ApiProperty({ type: String })
	identifier: string

	@ApiProperty({ type: String })
	token: string

	@ApiProperty({ type: Date })
	expires: Date
}
