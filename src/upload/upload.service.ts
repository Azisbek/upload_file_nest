import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { Upload } from './schema/upload.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(Upload.name) private uploadModel: mongoose.Model<Upload>,
  ) {}

  async saveImagePath(image: string): Promise<Upload> {
    const createdImage = new this.uploadModel({ image });
    return createdImage.save();
  }

  async getFile() {
    return this.uploadModel.find();
  }

  delete(id: string) {
    return this.uploadModel.findByIdAndDelete(id);
  }
}
