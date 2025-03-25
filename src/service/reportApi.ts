import {ReportRequest, ReportResponse} from "../models/report.ts";
import ApiClient from "./ApiClient.ts";

export class ReportApi {
	static async saveReport(request: ReportRequest) {
		const response: ReportResponse = await ApiClient.post('/api/v1/report', request);
		return response;
	}
}