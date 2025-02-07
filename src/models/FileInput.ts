import {HttpStatusCode} from "axios";

export type FileInputRequest = {
    file: FormData;
}

export type FileInputResponse = {
    status: HttpStatusCode
    message: string;
    sections: Section[];
    arguments: Argument[]
}

export type Section = {
    title: string;
    body: string;
    inferenced_text: string[];
    arguments: Argument[];
}

export type Argument = {
    text: string;
    start: number;
    end: number;
    type: string;
}