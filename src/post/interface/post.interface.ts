export interface IPost {
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

export interface IAuthors {
    id: string;
    name: string;
    email: string;
}

export interface SampleResponse {
    status: number;
    message: string;
}