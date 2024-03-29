import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

const BUCKET_NAME = 'hubereats128';

@Controller('uploads')
export class UploadsController {
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    AWS.config.update({
      credentials: {
        accessKeyId: '',
        secretAccessKey: '',
      },
    });
    try {
      const objName = `${Date.now() + '_' + file.originalname}`;
      // await new AWS.S3().createBucket({ Bucket: BUCKET_NAME }).promise();
      await new AWS.S3()
        .putObject({
          Body: file.buffer,
          Bucket: BUCKET_NAME,
          Key: objName,
          ACL: 'public-read',
        })
        .promise();
      const url = `https://${BUCKET_NAME}.s3.amazonaws.com/${objName}`;
      return { url };
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
