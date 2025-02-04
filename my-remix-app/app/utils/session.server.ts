import { createCookieSessionStorage } from "@remix-run/node";
import config from "~/config/config";
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "session",
    secrets: [config.sessionSecret],
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getSession(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  return sessionStorage.getSession(cookieHeader);
}
