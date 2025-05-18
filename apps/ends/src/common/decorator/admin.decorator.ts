import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { jwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { RoleRequiredGuard } from 'src/guard/role-required.guard';

export function AdminOnly() {
  return applyDecorators(
    SetMetadata('role', "ADMIN"),
    UseGuards(jwtAuthGuard, RoleRequiredGuard),
    // ApiBearerAuth(),
    // ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}


