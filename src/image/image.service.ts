import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as AWS from "aws-sdk";
import { CreateImageDto } from "./dto";

@Injectable()
export class ImageService {
  private readonly AWS_S3_BUCKET = process.env.AWS_S3_BUCKET!;

  private readonly s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-south-1",
  });

  constructor(private prisma: PrismaService) {}

  async uploadFile(file: Express.Multer.File): Promise<string> {
    // console.log("aaaa");

    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.AWS_S3_BUCKET,
      Key: `${Date.now()}_${file.originalname}`, // unique filename
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentDisposition: "inline",
    };

    try {
      const uploadResult = await this.s3.upload(params).promise();
      return uploadResult.Location; // S3 hosted file URL (string)
    } catch (error) {
      throw new Error(`S3 upload failed: ${error.message}`);
    }
  }

  async createImage(createImageDto: CreateImageDto) {
    return this.prisma.image.create({
      data: {
        imageUrl: createImageDto.imageUrl,
        homeId: createImageDto.homeId,
        isMainImage: createImageDto.isMainImage ?? false,
      },
    });
  }
  async findAll() {
    return this.prisma.image.findMany({include:{rentalList:true}});
  }
}
