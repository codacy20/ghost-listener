import { Injectable } from '@nestjs/common';
import { validate } from "class-validator";
import { IAuthors, IPost, SampleResponse } from './dto/post.dto';

@Injectable()
export class PostService {

    constructor() { }
    messages: IPost[] = [];
    ResponseMessage: string = '';
    ResponseStatus: number = 1;

    async create(message: IPost): Promise<SampleResponse> {
        const messageTemp = new IPost(message);
        await validate(messageTemp).then(errors => {
            if (errors.length > 0) {
                this.ResponseMessage = 'validation failed. errors' + errors;
                this.ResponseStatus = 400;
            } else {
                this.ResponseMessage = 'validation succeed';
                this.ResponseStatus = 202;
                this.messages.push(messageTemp);
            }
        });
        return {
            message: this.ResponseMessage,
            status: this.ResponseStatus
        };
    }

    getMessage(): IPost[] {
        return this.messages;
    }
}
