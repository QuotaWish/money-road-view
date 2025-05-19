import type { Type } from '@nestjs/common';
import { getSchemaPath } from '@nestjs/swagger';
import { ListResult } from 'src/common/dto/pagination.dto';

export function createListResponse<TModel extends Type<any>>(model: TModel) {
  return {
    description: 'List response',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ListResult) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(model) }
            }
          }
        }
      ]
    }
  };
}
