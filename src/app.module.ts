import { Module } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UploadModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DB_URI,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
