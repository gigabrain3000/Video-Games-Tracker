import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ReactElement, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function LogInPage(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      alert("Signed in successfully");
    } catch (error) {
      console.error(error);
    }
    if (auth.currentUser) {
      Cookies.set(
        "activeUser",
        JSON.stringify({
          email: auth.currentUser.email,
          accessToken: auth.currentUser.accessToken,
          id: auth.currentUser.uid,
        })
      );
    }
  };

  return (
    <section className="max-w-90 m-auto mt-10">
      <div className="flex items-center justify-between mb-6">
        <div className="text-left flex flex-col gap-1 w-[75%]">
          <h3 className="font-semibold">Login to your account</h3>
          <p>Enter your email below to login to your account</p>
        </div>
        <Button
          variant={"link"}
          className="cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </Button>
      </div>
      <form onSubmit={handleSignIn}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2 text-left">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={email}
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              required
              pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,20}$"
              title="Password must be more than 8 characters, less than 20 characters, contain at least 1 uppercase letter, 1 lowercase letter and 1 digit"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <Button type="submit" className="w-full cursor-pointer">
            Login
          </Button>
        </div>
      </form>
    </section>
  );
}
