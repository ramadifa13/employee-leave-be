import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  
  async login(email: string, password: string) {
    const user = await this.prisma.admin.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Email atau password salah');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Email atau password salah');
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  
  async register(email: string, password: string, firstName: string, lastName: string, birthDate: string, gender: string) {
    const existingUser = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('Email sudah terdaftar');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        birthDate: new Date(birthDate),  
        gender,
      },
    });

    return { message: 'Registrasi berhasil' };
  }
}
