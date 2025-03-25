import {Argument, Relation, SummaryInfo} from "./FileInput.ts";
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