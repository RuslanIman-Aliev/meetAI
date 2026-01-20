"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const { data: session } = authClient.useSession();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  console.log("Session:", session);
  const onSubmit = () => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: () => {
          alert("Error creating user");
        },
        onSuccess: () => {
          alert("User created successfully");
        },
      },
    );

    
  };
  if (session) {
      return <>
      <div>Logged in as {session.user.email}</div>
      <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </>;
    }
  return (
    <div>
      <Input
        value={name}
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        value={email}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={onSubmit}>Create yuser</Button>
    </div>
  );
}
