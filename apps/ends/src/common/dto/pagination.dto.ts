import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNumber, Max, Min } from 'class-validator';
import { cloneDeep, isEmpty, isNil } from 'lodash';

// 定义查询条件的类型
export type WhereType =
  | 'in'
  | 'contains'
  | 'eq'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte'
  | 'sin';

// 定义查询模式类型
export type ModType = 'and' | 'or';

// 定义查询条件选项的接口
export type WhereTypeOptions<T> = {
  type: WhereType;
  // 用于映射字段
  mapper?: keyof T;
  // 默认是 or
  mode?: ModType;
};

// 定义构建查询条件的选项接口
export interface BuildWhereOptions<K, T> {
  props: {
    [key in keyof Partial<Omit<K, keyof PaginationDto>>]: WhereTypeOptions<T>;
  };
  withDeleted?: boolean | keyof Omit<K, keyof PaginationDto>;
}

// 分页数据传输对象
export class PaginationDto {
  constructor(entity?: PaginationDto) {
    if (entity)
      Object.assign(this, cloneDeep(entity));
  }

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @ApiProperty({
    description: '分页页码',
  })
  @Min(1)
  @Transform(({ value }) => Number(value))
  page: number;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @Max(10000)
  @Min(5)
  @IsInt()
  @ApiProperty({
    description: '分页大小(5, 10, 20, 50, 100)',
  })
  @Transform(({ value }) => Number(value))
  pageSize: number;

  // 计算跳过的记录数和获取的记录数
  toSkipAndTake() {
    return {
      skip: (this.page - 1) * this.pageSize,
      take: this.pageSize,
    };
  }

  // 构建查询条件
  buildWhere<K = any>(options: BuildWhereOptions<this, K>) {
    let where: any = {};
    const paginationValue = this.getPaginationValue();
    const ands: any[] = Object.keys(options.props)
      .filter((key) => {
        return options.props[key].mode === 'and';
      })
      .map((key) =>
        this.whereBuilder(options.props[key], key, paginationValue[key]),
      );
    const ors: any[] = Object.keys(options.props)
      .filter((key) => {
        return (
          // 如果 mode 是 or 或者 mode 不存在，则返回 true (即默认是 or)
          options.props[key].mode === 'or' || isNil(options.props[key].mode)
        );
      })
      .map((key) => {
        return this.whereBuilder(options.props[key], key, paginationValue[key]);
      })
      .filter((item) => !isEmpty(item));
    where.OR = isEmpty(ors) ? undefined : ors;
    where = { ...where, ...Object.assign({}, ...ands) };
    if (options.withDeleted) {
      if (typeof options.withDeleted === 'boolean') {
        where.deleted = options.withDeleted;
      } else {
        where.deleted = {
          eq: paginationValue[options.withDeleted],
        };
      }
    }
    return where;
  }

  // 构建响应数据
  buildResponse<T>(data: T[], total: number) {
    return {
      data,
      total,
      page: this.page,
      pageSize: this.pageSize,
    };
  }

  // 构建单个查询条件
  private whereBuilder<T>(wto: WhereTypeOptions<T>, key: string, value: any) {
    if (value === undefined) {
      return {};
    }
    switch (wto.type) {
      case 'in':
        return {
          [wto.mapper ?? key]: {
            in: value,
          },
        };
      case 'contains':
        return {
          [wto.mapper ?? key]: {
            contains: value,
          },
        };
      case 'eq':
        return {
          [wto.mapper ?? key]: value,
        };
      case 'lt':
        return {
          [wto.mapper ?? key]: {
            lt: value,
          },
        };
      case 'lte':
        return {
          [wto.mapper ?? key]: {
            lte: value,
          },
        };
      case 'gt':
        return {
          [wto.mapper ?? key]: {
            gt: value,
          },
        };
      case 'gte':
        return {
          [wto.mapper ?? key]: {
            gte: value,
          },
        };
      case 'sin':
        return {
          [wto.mapper ?? key]: {
            some: {
              id: {
                in: value,
              },
            },
          },
        };
    }
  }

  // 获取需要分页对象的键值对
  private getPaginationValue() {
    const clone = cloneDeep(this);
    for (const key in PaginationDto.templatePaginationDtoInstance) {
      if (PaginationDto.templatePaginationDtoInstance.hasOwnProperty(key)) {
        delete clone[key];
      }
    }
    return clone as Omit<this, keyof PaginationDto>;
  }

  // 模板实例，用于类型空间到值空间的转换
  static readonly templatePaginationDtoInstance = new PaginationDto();
}

// 列表结果抽象类
export abstract class ListResult<T = any> {
  @ApiProperty({ type: Array<T>, description: '数据列表' })
   abstract data: T[];

  @ApiProperty({ type: Number, description: '总数' })
  total: number;

  @ApiProperty({ type: Number, description: '页码' })
  page: number;

  @ApiProperty({ type: Number, description: '每页大小' })
  pageSize: number;
}
