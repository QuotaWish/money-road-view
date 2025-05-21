import { Injectable } from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { prismaClient } from 'src/lib/database';

@Injectable()
export class ConfigService {
  create(createConfigDto: CreateConfigDto) {
    return 'This action adds a new config';
  }

  findAll() {
    return `This action returns all config`;
  }

  findOne(id: number) {
    return `This action returns a #${id} config`;
  }

  update(id: number, updateConfigDto: UpdateConfigDto) {
    return `This action updates a #${id} config`;
  }

  remove(id: number) {
    return `This action removes a #${id} config`;
  }

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
}
