import { redirect } from "@remix-run/node";
import { authService } from "~/utils/appwrite.server";
import { sessionStorage } from "~/utils/session.server";

export async function action({ request }: { request: Request }) {
  const result = await authService.createAccountWithGoogle();

  // Assume result contains user info and a session token
  if (result) {
    const session = await sessionStorage.getSession();
    session.set("sessionId", session.$id); // Store session ID from Appwrite

    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    });
  }

  return new Response("Authentication failed", { status: 401 });
}
