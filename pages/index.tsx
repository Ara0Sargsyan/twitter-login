import styles from '../styles/Home.module.css'
import { signIn, signOut, useSession, } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  console.log('session', session)
  return (
    <div className={styles.container}>
      {!session && <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>}
      {session && <>
        Signed in as {session.user && session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>}
    </div>
  )
}
