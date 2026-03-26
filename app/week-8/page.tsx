"use client";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  return (
    <div className="flex flex-col items-center w-full h-screen justify-center bg-[#141515]">
      <div className="fixed top-20 text-center">
        <h1 className="text-4xl font-bold">Week 8</h1>
        {user ? (
          <p className="text-xl font-bold text-center">
            Welcome, {user.displayName}!
          </p>
        ) : null}
      </div>
      {user ? (
        <div className="flex flex-col gap-4 rounded-xl items-center justify-center">
          <button
            className="w-80 h-20 text-xl font-bold rounded-lg hover:cursor-pointer bg-[#192830]"
            onClick={() => {
              window.location.href = "/week-8/shopping-list";
            }}
          >
            Shopping List
          </button>
          <button
            className="w-80 h-20 text-xl font-bold rounded-lg hover:cursor-pointer bg-[#192830]"
            onClick={async () => await firebaseSignOut()}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          className="w-80 h-20 text-xl font-bold rounded-lg hover:cursor-pointer bg-[#192830]"
          onClick={async () => await gitHubSignIn()}
        >
          Sign In with GitHub
        </button>
      )}
    </div>
  );
}

import { useUserAuth } from "./_utils/auth-context";
