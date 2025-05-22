import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigurationPagniationDto, CreateConfigurationDto, UpdateConfigDto } from './config.dto';
import { AdminOnly } from 'src/common/decorator/admin.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResult } from 'src/common/decorator/api-result.decorator';
import { Configuration } from 'prisma/prisma-class/configuration';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) { }

  @Post()
  @AdminOnly()
  @ApiOperation({ summary: 'Create a new configuration' })
  create(@Body() createConfigDto: CreateConfigurationDto) {
    const { namespace, key, valueType, value } = createConfigDto
    return this.configService.setConfig(namespace, key, value, valueType);
  }

  @Post("list")
  @AdminOnly()
  @ApiOperation({ summary: 'Get configuration list ' })
  @ApiResult(Configuration, true)
  getConfigurations(@Body() entity: ConfigurationPagniationDto) {
    return this.configService.getAllConfigurations(new PaginationDto(entity));
  }

  @Get(':id')
  @AdminOnly()
  @ApiOperation({ summary: 'Get configuration by id' })
  findOne(@Param('id') id: string) {
    return this.configService.getConfigById(id);
  }

  @Patch(':id')
  @AdminOnly()
  @ApiOperation({ summary: 'Update configuration' })
  update(@Param('id') id: string, @Body() updateConfigDto: UpdateConfigDto) {
    return this.configService.setConfigById(id, updateConfigDto);
  }

  @Delete(':id')
  @AdminOnly()
  @ApiOperation({ summary: 'Delete configuration' })
  remove(@Param('id') id: string) {
    return this.configService.archiveById(id);
  }
}
