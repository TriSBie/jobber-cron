import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow('AUTH_JWT_SECRET'),
        signOptions: {
          expiresIn: configService.getOrThrow('AUTH_JWT_EXPIRATIONS_MS'),
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ConfigModule
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
