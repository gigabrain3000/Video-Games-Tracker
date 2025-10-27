import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactElement } from "react";

export default function LogInPage(): ReactElement {
  return (
    <section className="max-w-90 m-auto mt-10">
      <div className="flex items-center justify-between mb-6">
        <div className="text-left flex flex-col gap-1 w-[75%]">
          <h3 className="font-semibold">Login to your account</h3>
          <p>Enter your email below to login to your account</p>
        </div>
        <Button variant={"link"} className="cursor-pointer">
          Sign Up
        </Button>
      </div>
      <form>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2 text-left">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full cursor-pointer">
            Login
          </Button>
        </div>
      </form>
    </section>
  );
}
