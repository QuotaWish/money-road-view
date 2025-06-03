import { Injectable } from '@nestjs/common';
import { prismaClient } from 'src/lib/database';
import { UpdateConfigDto, ConfigurationPagniationDto } from './config.dto';
import type { Configuration } from '@prisma/client';

@Injectable()
export class ConfigService {
  async setConfig(namespace: string, key: string, value: any, type: string = 'string') {
    const raw = type === 'json' ? JSON.stringify(value) : String(value);

    return prismaClient.configuration.upsert({
      where: {
        namespace_key: {
          namespace,
          key,
        },
      },
      update: {
        value: raw,
        valueType: type,
      },
      create: {
        namespace,
        key,
        value: raw,
        valueType: type,
      },
    });
  }

  async setConfigById(id: string, value: UpdateConfigDto) {
    const config = await this.getConfigById(id)

    if (!config) {
      return null
    }

    return this.setConfig(config.namespace, config.key, value)
  }


  async getConfig(key: string, namespace?: string) {
    const config = await prismaClient.configuration.findFirst({
      where: { key, namespace },
    });

    if (!config) return null;

    switch (config.valueType) {
      case 'json':
        return JSON.parse(config.value);
      case 'number':
        return Number(config.value);
      case 'boolean':
        return config.value === 'true';
      default:
        return config.value;
    }
  }


  async getConfigById(id: string) {
    const config = await prismaClient.configuration.findFirst({
      where: { id },
    });

    if (!config) return null;

    return this.getConfig(config.key, config.namespace);
  }

  async archive(key: string, namespace: string) {
    const config = await this.getConfig(key, namespace);

    if (!config) return null;

    return this.archiveById(config.id);
  }

  async archiveById(id: string) {
    return prismaClient.configuration.delete({ where: { id } })
  }

  async getAllConfigurations(entity: ConfigurationPagniationDto) {
    const { skip, take } = entity.toSkipAndTake()

    const whereQuery: any = {

    }

    if (entity.key) {
      whereQuery.name = {
        contains: entity.key
      }
    }
    if (entity.namespace) {
      whereQuery.name = {
        contains: entity.namespace
      }
    }
    if (entity.valueType) {
      whereQuery.name = {
        contains: entity.valueType
      }
    }

    const total = await prismaClient.configuration.count()
    const result = (await prismaClient.configuration.findMany({
      skip,
      take,
      where: {
        ...whereQuery
      }
    })) as unknown as Configuration[]

    return entity.buildResponse<Configuration>(result, total)
  }
}
