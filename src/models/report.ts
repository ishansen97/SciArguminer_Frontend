import {Argument, Relation, Summary, SummaryInfo} from "./FileInput.ts";
import {HttpStatusCode} from "axios";

export type ReportRequest = {
	reportName: string;
	arguments: Argument[];
	relations: Relation[];
	summary: SummaryInfo;
}

export type ReportResponse = {
	status: HttpStatusCode;
	message: string;
}

export type PublicReportRequest = {
	fromDate?: string;
    toDate?: string;
}

export type PublicReportResponse = {
	status: HttpStatusCode;
	records: Report[];
}

export type ReportSummaryRequest = {
	reportId: number;
}

export type ReportSummaryResponse = {
	status: HttpStatusCode;
	summary: Summary;
}

export type Report = {
	id: number;
	name: string;
	date: string;
}