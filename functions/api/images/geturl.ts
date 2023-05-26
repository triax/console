import { jsonResponse } from "../utils";

export interface DirectUploadResponse {
    result: {
        id: string;
        uploadURL: string;
    };
    result_info: any;
    success: boolean;
    errors: any[];
    messages: any[];
}

export const onRequestPost: PagesFunction<{
    // KV: KVNamespace;
    CLOUDFLARE_ACCOUNT: string;
    CLOUDFLARE_API_TOKEN: string;
}> = async ({ request, env }) => {
    const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT}/images/v2/direct_upload`, {
        method: "POST", headers: { Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}` },
    });
    if (!res.ok) return jsonResponse({success: false, error: res.statusText}, {status: res.status});
    const data: DirectUploadResponse = await res.json();
    return jsonResponse(data);
};
