import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

export default function SignUpPage() {
  const navigate: NavigateFunction = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const displayError = (): void => {
    // refactor
    alert("passwords are not equal");
  };

  const handleCreateUser = async (e: any) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        setDoc(doc(db, "users", auth.currentUser.uid), {
          email: email,
          username: name,
          id: auth.currentUser.uid,
          created: new Date(),
          gamesLibrary: [],
          gamesLists: [],
        });
      }
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="w-90 m-auto mt-10">
      <div className="mb-6 w-[100%]">
        <h3 className="text-left font-semibold">Create Account</h3>
      </div>
      <form
        onSubmit={
          password === confirmPassword ? handleCreateUser : displayError
        }
      >
        <div className="flex flex-col gap-4">
          <div className="grid gap-2 text-left">
            <Label htmlFor="email">E-mail</Label>
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
          <div className="grid gap-2 text-left">
            <Label htmlFor="email">Username</Label>
            <Input
              id="name"
              name="name"
              value={name}
              type="text"
              placeholder="Must include 6-16 characters"
              required
              minLength={6}
              maxLength={16}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
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
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Confirm Password</Label>
            </div>
            <Input
              type="password"
              id="confirm_password"
              name="confirm_password"
              value={confirmPassword}
              required
              pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,20}$"
              title="Password must be more than 8 characters, less than 20 characters, contain at least 1 uppercase letter, 1 lowercase letter and 1 digit"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <Button type="submit" className="w-full cursor-pointer">
            Create Account
          </Button>
        </div>
      </form>
    </section>
  );
}
