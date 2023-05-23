
// interface UploadResponse {
//     result: {
//         id: string;
//         filename: string;
//         uploaded: string;
//         requireSignedURLs: boolean;
//         variants: string[];
//     };
//     result_info: null;
//     success: boolean;
//     errors: any[];
//     messages: any[];
// }

/**
 * Cloudflare Image Service
**/
export default class CloudflareImageService {
    constructor(private account: string, private apitoken: string) { }
    // async upload(blob: Blob): Promise<UploadResponse> {
    async upload(blob: File): Promise<any> {
        console.log(blob);
        console.log(blob.size);
        const data = new FormData();
        data.set("file", blob, blob.name);
        const res =  await fetch(`https://api.cloudflare.com/client/v4/accounts/${this.account}/images/v1`, {
            method: "POST",
            body: data,
            headers: {
                "Authorization": `Bearer ${this.apitoken}`,
                "Content-Type": "multipart/form-data",
            },
            mode: "no-cors",
        });
        console.log(res);
        return null;
    }
}