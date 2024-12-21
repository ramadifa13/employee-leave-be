import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.prisma.admin.create({
      data: { ...dto, password: hashedPassword },
    });
  }

  async login(dto: LoginDto
  ) {
    const admin = await this.prisma.admin.findUnique({
      where: { email: dto.email },
    });
    if (!admin || !(await bcrypt.compare(dto.password, admin.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { token: this.jwt.sign({ sub: admin.id }) };
  }
}
