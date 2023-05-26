
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

    private async uploadViaURL(url: string): Promise<ImageUploadResponse> {
        const res = await fetch(`${this.baseURL}/api/images/viaurl`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url }),
        });
        if (res.status >= 400) throw new Error(res.statusText);
        const data = await res.json();
        return data;
    }

    async transferToCloudflare(raw?: string): Promise<string> {
        if (!raw) return "";
        const url = new URL(raw);
        if (url.host.includes("imagedelivery.net")) return raw; // No need to transfer
        const source = url;
        if (source.host == "drive.google.com" && source.pathname.match(/\/file\/d\/[a-zA-Z0-9_-]+\/view/)) {
            const id = source.pathname.split("/").at(-2);
            if (id) {
                source.pathname = "/uc"
                source.search = "?" + (new URLSearchParams({ export: "view", id })).toString();
            }
        }
        const res = await this.uploadViaURL(source.toString());
        return res.result.variants[0];
    }
}