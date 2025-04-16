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
    summary: Summary;
    globalArguments: Argument[];
    globalZones: ZoneLabel[];
    globalLocalArgumentInfo: GlobalLocalInfo;
    globalLocalArgumentInfoSentences: GlobalLocalInfoSentence;
}

export type Section = {
    title: string;
    body: string;
    inferenced_text: string[];
    arguments: Argument[];
    relations: Relation[];
    summary: Summary;
}

export type Argument = {
    text: string;
    start: number;
    end: number;
    type: string;
    title: string;
    zone: string;
}

export type Relation = {
    head: Argument;
    tail: Argument;
    relation: string;
}

export type ZoneLabel = {
    label: string;
    sentence: string;
    section: string;
}

export type GlobalLocalInfo = {
    [key: number]: Array<LocalArgumentInfo>;
}

export type GlobalLocalInfoSentence = {
    [key: number]: Array<LocalSentenceInfo>;
}

export type Summary = {
    arguments: SummaryInfo;
    relations: SummaryInfo;
    zoneLabels: SummaryInfo;
    // globalLocal: {
    //     globalArguments: SummaryInfo;
    //     localArguments: SummaryInfo;
    // };
}

export type SummaryInfo = {
    totalCount: number;
    [arg: string]: number;
}

export type LocalArgumentInfo = {
    argument: Argument;
    similarity: string;
}

export type LocalSentenceInfo = {
    localSentence: ZoneLabel;
    similarity: string;
}