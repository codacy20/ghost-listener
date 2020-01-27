import { Injectable } from '@nestjs/common';
import { IAuthors, IPost, SampleResponse } from './interface/post.interface';

@Injectable()
export class PostService {
    constructor() { }
    messages: IPost[] = [];
    create(message: IPost): IPost {
        this.messages.push(message);
        return message;
    }

    getMessage(): IPost[] {
        return this.messages;
    }
}
