import { IsDateString, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Nama depan admin', example: 'Rama' })
  firstName: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Nama belakang admin', example: 'Difa' })
  lastName: string;

  @IsEmail({}, { message: 'Format email tidak valid' })
  @ApiProperty({ description: 'Email admin', example: 'Ramadifa13@gmail.com' })
  email: string;

  @MinLength(8)
  @ApiProperty({ description: 'Password admin', example: 'password123' })
  password: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ description: 'Tanggal lahir admin (format: yyyy-mm-dd)', example: '1998-08-13' })
  birthDate: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Jenis kelamin admin', example: 'Laki-laki' })
  gender: string;
}
