import { ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { authService } from "~/utils/appwrite.server";
import { getSession } from "~/utils/session.server";

export default function Login() {
    const session = useLoaderData()
    console.log(session);
    const handlePhone = async () =>{
        
    }
    return (
      <div>
        <h1>Login</h1>
        <Form method="post" action="/auth/google">
          <Button type="submit">Login with Google</Button>
        </Form>
        <Button onClick={handlePhone}>Phone</Button>
      </div>
    );
  }
  export async function action({request}:ActionFunctionArgs) {
    const result = await authService.createAccountWithGoogle();
    console.log(result,"action result");
    const redirectUrl = String(result)
    return redirect(redirectUrl);
  }

  export async function loader({request}:LoaderFunctionArgs){
    const session = await getSession(request)
    console.log(session.id);
    return Response.json({sessionId:session.id})
   
}