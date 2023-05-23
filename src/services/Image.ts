
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

// interface DirectUploadResponse {
//     result: {
//         id: string;
//         uploadURL: string;
//     };
//     result_info: any;
//     success: boolean;
//     errors: any[];
//     messages: any[];
// }

/**
 * Cloudflare Image Service
**/
export default class CloudflareImageService {
    // async upload(blob: Blob): Promise<UploadResponse> {

    async upload(blob: File): Promise<any> {

        console.log(blob);
        console.log(blob.size);
        const data = new FormData();
        data.set("file", blob, blob.name);
        // const url = "https://upload.imagedelivery.net/bnLYbmoPaEBOGwhAJnzfgw/7bcbb092-0fe4-4735-6221-198c46990400";
        const url = "https://upload.imagedelivery.net/bnLYbmoPaEBOGwhAJnzfgw/7d372f34-1c42-4014-77f4-4dd307390a00";
        const res =  await fetch(url, {
            method: "POST",
            body: data,
            headers: {
                // "Content-Type": "multipart/form-data",
            },
        });
        console.log(res);
        console.log(await res.text());
        // console.log(await res.json());
        return null;
    }
}