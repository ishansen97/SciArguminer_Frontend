import {HttpStatusCode} from "axios";

export type FileInputRequest = {
    file: FormData;
}

export type FileInputResponse = {
    status: HttpStatusCode
    message: string;
    sections: Section[];
}

export type Section = {
    title: string;
    body: string;
}