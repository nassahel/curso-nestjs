import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { envVaidationSchema } from 'src/config/env-validation';
import { ProductsModule } from '../products/products.module';
import { ProfilesModule } from '../profiles/profiles.module';


@Module({
  imports: [
    UsersModule,
    ProductsModule,
    ProfilesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validationSchema: envVaidationSchema
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
