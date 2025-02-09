import {HttpStatusCode} from "axios";

export type HistoryRequest = {
    fromDate?: string;
    toDate?: string;
}

export type HistoryResponse = {
    status: HttpStatusCode;
    records: History[];
}

export type History = {
    id: number;
    paper: string;
    date: string;
    authors: string;
}