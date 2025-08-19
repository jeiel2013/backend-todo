/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    console.log('Email recebido:', email);
    console.log('Usuário encontrado:', user);

    if (user) {
      console.log('Senha recebida:', password);
      console.log('Tipo da senha:', typeof password);
      console.log('Length da senha:', password.length);
      console.log('Senha em bytes:', Buffer.from(password));

      // Teste manual do hash
      const testHash = await bcrypt.hash(password, 10);
      console.log('Novo hash da mesma senha:', testHash);
      console.log('Novo hash bate?', await bcrypt.compare(password, testHash));

      console.log('Hash do banco:', user.password);
      console.log(
        'Hash bate com o do banco?',
        await bcrypt.compare(password, user.password),
      );
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Credenciais inválidas');
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });
    const { password, ...result } = user;
    return result;
  }
}
