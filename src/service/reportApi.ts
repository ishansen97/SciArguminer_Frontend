import {
	PublicReportRequest,
	PublicReportResponse, ReportDownloadRequest,
	ReportRequest,
	ReportResponse,
	ReportSummaryRequest, ReportSummaryResponse
} from "../models/report.ts";
import ApiClient from "./ApiClient.ts";
import {createdDownloadUrl} from "../utils/downloadUtils.ts";

export class ReportApi {
	static async saveReport(request: ReportRequest) {
		const response: ReportResponse = await ApiClient.post('/api/v1/report', request);
		return response;
	}

	static async getPublicReports(request: PublicReportRequest): Promise<PublicReportResponse> {
        const {fromDate, toDate} = request
        let fromParam: string | null = null
        let toParam: string | null = null;
        if (fromDate) fromParam = fromDate
        if (toDate) toParam = toDate

        return await ApiClient.get(`/api/v1/reports/?fromDate=${fromParam}&toDate=${toParam}`);
    }

	static async getReportSummary(request: ReportSummaryRequest): Promise<ReportSummaryResponse> {
		const response: ReportSummaryResponse = await ApiClient.get(`/api/v1/report/${request.reportId}`);
		return response;
	}

	static async downloadReport(request: ReportDownloadRequest): Promise<void> {
		const response: never = await ApiClient.get(`/api/v1/report/download/${request.reportId}`, {responseType: "blob"});
		createdDownloadUrl(response);
	}

	static async downloadProcessedReport(request: ReportRequest): Promise<void> {
		const response: never = await ApiClient.post(`/api/v1/report/processed-report-download`, request, {responseType: "blob"});
		createdDownloadUrl(response);
	}
}