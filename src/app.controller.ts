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
  create(@Body() message: IncomingMessage): SampleResponse {
    // console.log(message.post.current.id)
    const response = this.postService.create(message.post.current);

    return {
      message: response.id,
      status: 202
    };
  }

  @Get('message')
  getMessages(): IPost[] {
    // console.log(message.post.current.id)
    const response = this.postService.getMessage();
    return response;
  }
}
