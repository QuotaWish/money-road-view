import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class Configuration {
	@ApiProperty({ type: String })
	id: string

	@ApiPropertyOptional({ type: String })
	namespace?: string

	@ApiProperty({ type: String })
	key: string

	@ApiProperty({ type: String })
	value: string

	@ApiProperty({ type: String })
	valueType: string

	@ApiPropertyOptional({ type: String })
	description?: string

	@ApiProperty({ type: Boolean })
	isPublic: boolean

	@ApiProperty({ type: Date })
	createdAt: Date

	@ApiProperty({ type: Date })
	updatedAt: Date
}
