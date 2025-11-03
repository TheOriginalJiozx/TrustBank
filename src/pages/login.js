import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <p>Velkommen, {session.user.name}</p>
          <button onClick={() => signOut()}>Log ud</button>
        </>
      ) : (
        <button onClick={() => signIn("github")}>Register with GitHub</button>
      )}
    </div>
  );
}