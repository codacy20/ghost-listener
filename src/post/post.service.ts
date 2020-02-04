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
            status: this.ResponseStatus,
            payload: [this.messages[this.messages.length - 1]]
        };
    }

    getJsonFile(): Promise<any> {
        let myFirstPromise = new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '../assets/sample.json'), 'utf8', (error, data) => {
                if (data)
                    resolve(JSON.parse(data))
                if (error)
                    reject('nay')
            });
        })
        return myFirstPromise;
    }

    async appendJsonFile(): Promise<SampleResponse> {
        if (this.messages.length > 0) {
            this.messages.forEach(async (message: IPost) => {
                const key = `${message.slug}`.toString();
                const obj = await this.getJsonFile();
                obj[key] = message;
                let myFirstPromise = new Promise((resolve, reject) => {
                    fs.writeFile(path.join(__dirname, '../assets/sample.json'), JSON.stringify(obj), (err) => {
                        if (err) reject(err);
                        else resolve(obj);
                    });
                })
                myFirstPromise.then(() => {
                    this.messages = [];
                })
            });
            return {
                message: 'Appended',
                status: 202,
                payload: this.messages
            }
        }
        else
            return {
                message: 'Failed',
                status: 500,
            };
    }

    getMessage(): SampleResponse {
        if (this.messages.length > 0) {
            return {
                message: this.messages.length + ' result found',
                status: 202,
                payload: this.messages
            }
        }
        else
            return {
                message: 'no result was found',
                status: 404,
                payload: null
            }
    }
}
