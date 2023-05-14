
const BASICAUTH_USER = "test";
const BASICAUTH_PASS = "testtest";

export const onRequest: PagesFunction = async ({ next, request }) => {
    const auth = request.headers.get("Authorization");
    if (!auth) {
        return new Response("Authorization header not found", {
            status: 401,
            headers: {"WWW-Authenticate": 'Basic realm="Hello"'},
        })
    }
    const [schema, encoded] = auth.split(" ");
    if (!encoded || schema !== "Basic") {
        return new Response("Invalid authorization", { status: 401 });
    }
    const [user, pass] = atob(encoded).split(":");
    if (user !== BASICAUTH_USER || pass !== BASICAUTH_PASS) {
        return new Response("Invalid authorization", { status: 401 });
    }
    return await next();
}
