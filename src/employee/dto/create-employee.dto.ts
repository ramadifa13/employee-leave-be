import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'Nama depan karyawan', example: 'John' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Nama belakang karyawan', example: 'Doe' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Email karyawan', example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Nomor telepon karyawan', example: '+6281234567890' })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ description: 'Alamat karyawan', example: 'Jl. Raya No. 1' })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Jenis kelamin karyawan', example: 'Laki-laki' })
  @IsNotEmpty()
  gender: string;
}
