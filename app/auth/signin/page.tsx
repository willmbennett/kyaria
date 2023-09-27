"use client"
import { getProviders, signIn, useSession, SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation'

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};

const SignIn: React.FC = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null);

  if (session) {
    if(session.user) {
      redirect(`/profile/${session.user.id}`)
    } else {
      redirect(`/`)
    }
  }

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="p-8 bg-white w-full lg:w-1/4">
      <img src='/icon-hor.svg' alt='Horizontal Login' />
        <h1 className="text-2xl mb-4 text-center font-bold text-gray-700">Sign In</h1>
        {providers && Object.values(providers).map((provider) => (
          <div key={provider.name} className="mb-3">
            <button
              onClick={() => signIn(provider.id)}
              className="w-full py-2 px-4 text-white rounded hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{ backgroundColor: '#00703C' }}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>

  );
};

export default SignIn;
