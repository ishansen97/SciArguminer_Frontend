import {HttpStatusCode} from "axios";

export type FileInputRequest = {
    file: FormData;
}

export type FileInputResponse = {
    status: HttpStatusCode
    message: string;
    sections: Section[];
    arguments: Argument[];
    relations: Relation[];
}

export type Section = {
    title: string;
    body: string;
    inferenced_text: string[];
    arguments: Argument[];
    relations: Relation[];
}

export type Argument = {
    text: string;
    start: number;
    end: number;
    type: string;
}

export type Relation = {
    head: Argument;
    tail: Argument;
    relation: string;
}