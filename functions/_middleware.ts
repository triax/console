
const BASICAUTH_USER = "test";
const BASICAUTH_PASS = "testtest";

export const onRequest: PagesFunction = async ({ next, request }) => {
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
    if (user !== BASICAUTH_USER || pass !== BASICAUTH_PASS) {
        return onFailure("Invalid authorization");
    }
    return await next();
}
