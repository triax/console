
interface ImageUploadResponse {
    result: {
        id: string;
        filename: string;
        uploaded: string;
        requireSignedURLs: boolean;
        variants: string[];
    };
    result_info: null;
    success: boolean;
    errors: any[];
    messages: any[];
}

/**
 * Cloudflare Image Service
**/
export default class CloudflareImageService {
    // async upload(blob: Blob): Promise<UploadResponse> {
    constructor(private baseURL: string = "") { }

    private async getUploadURL(): Promise<string> {
        const res = await fetch(`${this.baseURL}/api/images`, { method: "POST" });
        if (!res.ok) throw new Error(res.statusText);
        const data  = await res.json();
        if (!data.success) throw new Error(data.error);
        return data.result.uploadURL;
    }

    async upload(blob: File): Promise<ImageUploadResponse> {
        const url = await this.getUploadURL();
        const body = new FormData();
        body.set("file", blob, blob.name);
        const res = await fetch(url, { method: "POST", body });
        const data = await res.json();
        return data;
    }
}