import { LoaderFunction, redirect } from "@remix-run/node";
import { authService } from "~/utils/appwrite.server";
import { createCookieSessionStorage } from "@remix-run/node";
import config from "~/config/config";

// Configure session storage for user authentication
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "appwrite_session",
    secrets: [config.sessionSecret],
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
});

export const loader: LoaderFunction = async ({ request }) => {
  // Extract session ID from Appwrite OAuth response
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");

 if (!sessionId) return redirect("/login");

  const user = await authService.getCurrentUser(sessionId);

 if (!user) return redirect("/login");

  // Store session in a cookie
  const session = await sessionStorage.getSession();
  session.set("session_id", sessionId);
console.log("session id", sessionId);

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
};
