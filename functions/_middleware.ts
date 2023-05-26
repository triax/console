
export const onRequest: PagesFunction<{
    BASICAUTH_USER, BASICAUTH_PASS,
}> = async ({ next, request, env }) => {
    const onFailure = (msg) => new Response(msg, { status: 401, headers: { "WWW-Authenticate": 'Basic realm="Hello"' } });
    const auth = request.headers.get("Authorization");
    if (!auth) {
        return onFailure("Authorization header not found");
    }
    const [schema, encoded] = auth.split(" ");
    if (!encoded || schema !== "Basic") {
        return onFailure("Invalid authorization")
    }
    const [user, pass] = atob(encoded).split(":");
    if (user !== env.BASICAUTH_USER || pass !== env.BASICAUTH_PASS) {
        return onFailure("Invalid authorization");
    }
    const response = await next();
    // response.headers.set("Access-Control-Allow-Origin", "*");
    // response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    // response.headers.set("Access-Control-Allow-Headers", "*");
    return response;
}
