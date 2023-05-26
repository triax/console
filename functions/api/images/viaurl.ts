import { jsonResponse } from "../utils";
import { DirectUploadResponse } from "./index";

/**
 * @param {Request} request
 * @param {Env} env
 * @returns {Promise<Response>}
 * @throws {Error}
 * @see https://developers.cloudflare.com/images/api-v2/#direct-upload-via-url
 */
export const onRequestPost: PagesFunction<{
    // KV: KVNamespace;
    CLOUDFLARE_ACCOUNT: string;
    CLOUDFLARE_API_TOKEN: string;
}> = async ({ request, env }) => {
    const url = (await request.json())["url"];
    const body = await request.formData();
    body.set("url", url);
    const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT}/images/v1`, {
        method: "POST", body, headers: { Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}` },
    });
    if (!res.ok) return jsonResponse({success: false, error: res.statusText}, {status: res.status});
    const data: DirectUploadResponse = await res.json();
    return jsonResponse(data);
}