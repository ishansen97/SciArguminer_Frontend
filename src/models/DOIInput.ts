import {HttpStatusCode} from "axios";

export type DOIInputRequest = {
	doiUrl: string;
}

export type DOIProcessRequest = {
	fileName: string;
}

export type DOIInputResponse = {
	status: HttpStatusCode;
	filePath: string;
}