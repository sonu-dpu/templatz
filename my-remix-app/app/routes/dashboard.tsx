import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authService } from "~/utils/appwrite.server";
import { createCookieSessionStorage } from "@remix-run/node";
import config from "~/config/config";

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
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const sessionId = session.get("session_id");

  if (!sessionId) return redirect("/login");

  const user = await authService.getCurrentUser(sessionId);
  if (!user) return redirect("/login");

  return user;
};
type User={
    name:string;
}
export default function Dashboard() {
  const user = useLoaderData<User>();
  console.log(user, "dashboard");
  
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <form method="post" action="/auth/logout">
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}
