import {FileInputResponse} from "../models/FileInput.ts";
import ApiClient from "./ApiClient.ts";
// import {AxiosRequestConfig} from "axios";

export class FileApi {
    static async handleFileInput(file: FormData): Promise<FileInputResponse> {
        // const request: FileInputRequest = {
        //     file: file,
        // }
        // console.log(Array.from(file.entries()));
        const response: FileInputResponse = await ApiClient.postFile('/api/v1/file', file);
        console.log(`file input response: ${response}, response status: ${response.status}`);
        return response;
    }
}