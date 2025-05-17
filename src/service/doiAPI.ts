import {DOIInputRequest, DOIInputResponse, DOIProcessRequest} from "../models/DOIInput.ts";
import ApiClient from "./ApiClient.ts";
import {FileInputResponse} from "../models/FileInput.ts";

export class DOIAPI {
	static async getDoiFileInfo(request: DOIInputRequest): Promise<DOIInputResponse> {
		const {doiUrl} = request;

		const response: DOIInputResponse = await ApiClient.get(`/api/v1/access-doi/?doiUrl=${doiUrl}`)
		return response
	}

	static async processDoiFile(request: DOIProcessRequest): Promise<FileInputResponse> {
		const {fileName} = request;

		const response: FileInputResponse = await ApiClient.get(`/api/v1/process-doi/?fileName=${fileName}`)
		return response
	}
}