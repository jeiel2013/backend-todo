import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [AuthModule, UsersModule, TodosModule, PrismaModule],
})
export class AppModule {}
