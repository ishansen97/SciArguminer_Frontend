import axios, {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';

class ApiClient {
    private static baseUrl: string = import.meta.env.VITE_API_BASE_URL;

    private static async handleResponse<T>(response: AxiosResponse<T>): Promise<T> {
        if (response.status == HttpStatusCode.Ok) {
            return response.data;
        } else if (response.status == HttpStatusCode.NotFound) {
            return <T>null;
        }
        return <T>null;
    }

    // Generic GET method
    static async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios.get(`${this.baseUrl}${endpoint}`, config);
            return this.handleResponse(response);
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    // Generic POST method
    static async post<T,R>(endpoint: string, data: Partial<T>, config?: AxiosRequestConfig): Promise<R> {
        try {
            console.log(`base url: ${this.baseUrl}`);
            const response: AxiosResponse<R> = await axios.post(`${this.baseUrl}${endpoint}`, data, config);
            console.log(`response: ${response}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    static async postFile<R>(endpoint: string, data: FormData, config?: AxiosRequestConfig): Promise<R> {
        try {
            console.log(`base url: ${this.baseUrl}`);
            const response: AxiosResponse<R> = await axios.post(`${this.baseUrl}${endpoint}`, data, config);
            console.log(`response: ${response}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    // Generic PUT method
    static async put<T,R>(endpoint: string, data: Partial<T>, config?: AxiosRequestConfig): Promise<R> {
        try {
            const response: AxiosResponse<R> = await axios.put(`${this.baseUrl}${endpoint}`, data, config);
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    // Generic DELETE method
    static async delete(endpoint: string, config?: AxiosRequestConfig): Promise<void> {
        try {
            await axios.delete(`${this.baseUrl}${endpoint}`, config);
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    // Method to handle errors
    private static handleError(error: unknown): void {
        console.error('API request error:', error);
    }
}

export default ApiClient;