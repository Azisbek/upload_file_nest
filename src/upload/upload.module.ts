import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadSchema } from './schema/upload.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Upload', schema: UploadSchema }]),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
