import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // deixa disponível globalmente, não precisa importar em cada módulo
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
