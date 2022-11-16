import { ApiApolloModule } from '@elektra-nx/api/apollo/feature';
import { BlockModule } from '@elektra-nx/api/block/feature';
import { ApiShellConfigModule } from '@elektra-nx/api/shell/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [ApiShellConfigModule, ApiApolloModule, BlockModule],
  exports: [ApiShellConfigModule],
})
export class ApiShellModule {}
