import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: 'Nama depan pengguna', example: 'Rama' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Nama belakang pengguna', example: 'Difa' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Alamat email pengguna', example: 'Ramadifa13@gmail.com' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  email: string;

  @ApiProperty({ description: 'Kata sandi pengguna', minLength: 8, example: 'password123' })
  @MinLength(8)
  password: string;

  @ApiProperty({ description: 'Tanggal lahir pengguna', example: '1998-08-13' })
  @IsNotEmpty()
  @IsDateString()
  birthDate: string;

  @ApiProperty({ description: 'Jenis kelamin pengguna', example: 'Laki-laki' })
  @IsNotEmpty()
  @IsString()
  gender: string;
}

export class LoginDto {
  @ApiProperty({ description: 'Alamat email pengguna', example: 'Ramadifa13@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Kata sandi pengguna', minLength: 8, example: 'password123' })
  @MinLength(8)
  password: string;
}
