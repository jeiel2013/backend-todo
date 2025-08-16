/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, title: string) {
    return this.prisma.todo.create({
      data: { title, userId },
    });
  }

  async findAll(userId: number) {
    return this.prisma.todo.findMany({
      where: { userId },
    });
  }

  async toggleCompleted(id: number, completed: boolean) {
    return this.prisma.todo.update({
      where: { id },
      data: { completed },
    });
  }

  async delete(id: number) {
    return this.prisma.todo.delete({ where: { id } });
  }
}
