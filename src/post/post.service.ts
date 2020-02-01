import { Injectable } from '@nestjs/common';
import { validate } from "class-validator";
import { IAuthors, IPost, SampleResponse } from './dto/post.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PostService {

    constructor() { }
    messages: IPost[] = [];
    ResponseMessage: string = '';
    ResponseStatus: number = 1;
    jsonFile: any;

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

    getJsonFile(): Promise<any> {
        let myFirstPromise = new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '../assets/sample.json'), 'utf8', (error, data) => {
                if (data)
                    resolve(JSON.parse(data));
                if (error)
                    reject('nay')
            });
        })
        return myFirstPromise;
    }

    async appendJsonFile(): Promise<any> {
        const jsonFile: JSON = await this.getJsonFile();
        let arr = [];
        arr.push(jsonFile);
        this.messages.forEach(element => {
            arr.push(element);
        });
        return arr;
    }

    getMessage(): IPost[] {
        return this.messages;
    }
}
