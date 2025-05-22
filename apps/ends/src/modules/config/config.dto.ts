import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Configuration } from 'prisma/prisma-class/configuration';
import { ListResult, PaginationDto } from 'src/common/dto/pagination.dto';

export class ListResultConfiguration extends ListResult<Configuration> {
  @ApiProperty({ type: Array<Configuration> })
  data: Configuration[];
}

export class ConfigurationPagniationDto extends PaginationDto {

  @MinLength(1)
  @MaxLength(32)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '命名空间',
  })
  namespace?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '键名',
  })
  key?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '键值类型',
  })
  valueType?: string;
}

export class CreateConfigurationDto {

  @MinLength(1)
  @MaxLength(32)
  @IsString()
  @ApiProperty({
    description: '命名空间',
  })
  namespace: string;

  @MinLength(1)
  @MaxLength(128)
  @IsString()
  @ApiProperty({
    description: '键名',
  })
  key: string;

  @MinLength(1)
  @MaxLength(512)
  @IsString()
  @ApiProperty({
    description: '键值',
  })
  value: string;

  @MinLength(1)
  @MaxLength(128)
  @IsString()
  @ApiProperty({
    description: '键值类型',
  })
  valueType: string;

  @MinLength(1)
  @MaxLength(256)
  @IsString()
  @ApiProperty({
    description: '键描述',
  })
  description: string;

  @IsBoolean()
  @ApiProperty({
    description: '是否公开',
  })
  isPublic: boolean;

}

export class UpdateConfigDto extends PartialType(CreateConfigurationDto) { }