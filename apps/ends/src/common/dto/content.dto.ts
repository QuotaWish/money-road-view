import { ApiProperty } from '@nestjs/swagger'
import type { ListResult } from './pagination.dto'

class ResponseDto {
  @ApiProperty()
  code: number
  @ApiProperty()
  msg: string
}

export class ResponseObjDto<TData> extends ResponseDto {
  @ApiProperty()
  data: TData
}

export class ResponseListDto<TData> extends ResponseDto {
  @ApiProperty()
  data: TData[]
}

export class ResponsePaginatedDto<TData> extends ResponseDto {
  @ApiProperty()
  data: ListResult<TData[]>
}
