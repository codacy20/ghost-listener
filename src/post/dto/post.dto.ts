import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export interface IncomingMessage {
    post: IPostAbstract;
}

export interface IPostAbstract {
    current: IPost;
    previous?: IPost;
}

export class IPost {

    constructor(message: IPost) {
        this.title = message.title;
        this.id = message.id;
        this.plaintext = message.plaintext;
        this.html = message.html;
        this.created_at = new Date(message.created_at);
        this.updated_at = new Date(message.updated_at);
        this.published_at = new Date(message.published_at);
        this.status = message.status;
        this.slug = message.slug;
    }

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    plaintext: string;

    html: HTMLElement;

    @IsDate()
    created_at: Date;

    @IsDate()
    updated_at: Date;

    @IsDate()
    published_at: Date;

    @IsString()
    status: string;

    @IsString()
    slug: string;

    authors: IAuthors[];
}

export class IAuthors {
    id: string;
    name: string;
    email: string;
}

export class SampleResponse {
    status: number;
    message: string;
    payload?: IPost[];
}