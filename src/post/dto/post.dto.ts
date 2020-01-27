export interface IncomingMessage {
    post: IPostAbstract;
}

export interface IPostAbstract {
    current: IPost;
    previous?: IPost;
}

export class IPost {
    title: string;
    id: string;
    plaintext: string;
    html: HTMLElement;
    created_at: Date;
    updated_at: Date;
    published_at: Date;
    status: string;
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
}