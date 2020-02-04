import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { PostService } from './post/post.service';
import { SampleResponse } from './post/interface/post.interface';
import { IncomingMessage, IPost } from './post/dto/post.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private postService: PostService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('message')
  async create(@Body() message: IncomingMessage): Promise<SampleResponse> {
    // console.log(message.post.current.id)
    const response = await this.postService.create(message.post.current);
    return response;
  }

  @Get('message')
  getMessages(): SampleResponse {
    // console.log(message.post.current.id)
    const response = this.postService.getMessage();
    return response;
  }

  @Get('json')
  async getJSON(): Promise<any> {
    return await this.postService.getJsonFile();
  }

  @Get('append')
  async appendJSON(): Promise<any> {
    return await this.postService.appendJsonFile();
  }

}
