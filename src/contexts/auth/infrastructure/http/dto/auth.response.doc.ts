import { ApiProperty } from '@nestjs/swagger';

class AuthUserResponseDoc {
  @ApiProperty({ example: '7b0f5690-d1b8-4f53-9ec2-821f0b75c1ef' })
  id!: string;

  @ApiProperty({ example: 'user@example.com' })
  email!: string;
}

export class AuthResponseDoc {
  @ApiProperty()
  accessToken!: string;

  @ApiProperty({ type: AuthUserResponseDoc })
  user!: AuthUserResponseDoc;
}
