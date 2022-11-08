import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react";
import Confetti from 'react-confetti';
import { useTimeout, useWindowSize, useLocalStorage } from 'react-use';
import Button from "../components/Button";
import Tweets from "../components/Tweets";
import Image from "next/image";
import Layout from "../components/Layout";

export default function Home() {
  const [loader, setLoader] = useState(false);
  const { width, height } = useWindowSize();
  const [isConfettiCompleted, setConfettiCompleted] = useLocalStorage('confettiCompleted', false);
  const { data: session, status } = useSession();
  const [isComplete] = useTimeout(5000);


  function oauthSignOut() {
    if (!loader) {
      setLoader(!loader);
      setConfettiCompleted(false)
      signOut();
    }
  }

  if (status === 'loading') return <Layout> Loading... </Layout>;

  function oauthSignIn() {
    if (!loader) {
      setLoader(!loader);
      signIn('twitter');
    }
  }


  if (session) {
    return (
      <Layout>
        {
          !isConfettiCompleted &&
          <Confetti
            run={!isConfettiCompleted}
            width={width}
            height={height}
            recycle={!isComplete()}
            numberOfPieces={50}
            onConfettiComplete={() => setConfettiCompleted(true)}
          />
        }
        <Tweets />
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-center max-w-4xl py-6 sm:w-full 2xl:py-12">
          <Button label="Logout" onClick={() => oauthSignOut()} loader={loader}>Sign out</Button>
        </div>
      </Layout>
    )
  }
  return (
    <Layout>
      <div className="mb-10">
        <Image
          src="/cover-logo.png"
          alt="Picture of the author"
          width={800}
          height={300}
        />
      </div>
      <div className="flex flex-col md:flex-row">
        <Button label="Login with Twitter" onClick={() => oauthSignIn()} loader={loader}>
          Sign in
        </Button>
      </div>
    </Layout>
  )
}
