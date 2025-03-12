import {
  Controller,
  Post,
  UploadedFile,
  Body,
  UseInterceptors,
  BadRequestException,
  ParseBoolPipe,
  ParseIntPipe,
  Get,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImageService } from "./image.service";
import { CreateImageDto } from "./dto/create-image.dto";

@Controller("images")
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post("upload")
  @UseInterceptors(
    FileInterceptor("imageUrl", {
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
      fileFilter: (req, file, callback) => {
        // Restrict to image files only
        const allowedTypes = /jpeg|jpg|png|gif/;
        const isImage = allowedTypes.test(file.mimetype);
        if (!isImage) {
          return callback(
            new BadRequestException("Only image files are allowed!"),
            false
          );
        }
        callback(null, true);
      },
    })
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body("homeId", ParseIntPipe) homeId: number,
    @Body("isMainImage", ParseBoolPipe) isMainImage?: boolean
  ) {
    // console.log( "rasm");
    const imageUrl = await this.imageService.uploadFile(file);

    const createImageDto: CreateImageDto = {
      imageUrl,
      homeId,
      isMainImage,
    };

    return this.imageService.createImage(createImageDto);
  }
  @Get()
  async findAll() {
    return this.imageService.findAll();
  }
}
