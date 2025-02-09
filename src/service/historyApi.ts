import {HistoryRequest, HistoryResponse} from "../models/History.ts";
import ApiClient from "./ApiClient.ts";

export class HistoryApi {
    static async getHistoryResults(request: HistoryRequest): Promise<HistoryResponse> {
        const {fromDate, toDate} = request
        let fromParam: string | null = null
        let toParam: string | null = null;
        if (fromDate) fromParam = fromDate
        if (toDate) toParam = toDate

        return await ApiClient.get(`/api/v1/history/?fromDate=${fromParam}&toDate=${toParam}`);
    }
}