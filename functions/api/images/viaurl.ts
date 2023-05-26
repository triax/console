import { jsonResponse } from "../utils";

export const onRequestPost: PagesFunction<{
    // KV: KVNamespace;
    CLOUDFLARE_ACCOUNT: string;
    CLOUDFLARE_API_TOKEN: string;
}> = async ({ request, env }) => {
    const req: any = (await request.json());
    const body = new FormData();
    body.set("url", req.url);
    if (req.filename) body.set("metadata", JSON.stringify({ filename: req.filename }));
    const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT}/images/v1`, {
        method: "POST", body, headers: { Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}` },
    });
    if (!res.ok) return jsonResponse({success: false, error: res.statusText}, {status: res.status});
    const data = await res.json();
    return jsonResponse(data);
}