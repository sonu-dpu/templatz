import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { Button } from "~/components/ui/button";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};


export default function Index() {
  
  return (
    <div className="border border-white  rounded-lg">
      <Form method="post">
        <Button type="submit">Google</Button>
      </Form>
      
    </div>
  );
}

