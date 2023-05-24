import React from 'react'
import { signOut, getSession } from 'next-auth/react'
import { NextPageContext } from 'next'

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
  
    if (!session) {
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        }
      }
    }
  
    return {
      props: {}
    }
}
  

const Home = () => {
    return <>
        <h1 className="text-2xl text-green-500">Hello</h1>
        <button className="h-10 w-full bg-white" onClick={() => signOut()}>Logout</button>
    </>
}

export default Home