import {
  Controller,
  Post,
  UseInterceptors,
  Res,
  UploadedFile,
  HttpStatus,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/post')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: '/tmp',
        filename: (req, file, callBack) => {
          const fileName =
            path.parse(file.originalname).name.replace(/\s/g, '') + Date.now();
          const extension = path.parse(file.originalname).ext;
          callBack(null, `${fileName}${extension}`);
        },
      }),
    }),
  )
  async uploadFile(@Res() res, @UploadedFile() file) {
    const filePath = file.path.replace(/\\/g, '/');
    const savedImage = await this.uploadService.saveImagePath(filePath);
    return res.status(HttpStatus.OK).json({
      success: true,
      data: savedImage,
    });
  }

  @Get()
  async getFile() {
    return this.uploadService.getFile();
  }

  @Delete(':id')
  removeCatalog(@Param('id') id: string) {
    return this.uploadService.delete(id);
  }
}
