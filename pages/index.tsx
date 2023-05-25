import React from 'react'
import { getSession } from 'next-auth/react'
import { NextPageContext } from 'next'
import NavBar from '@/components/Navbar';

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
    // const { data: user } = useCurrentUser()

    return <>
        <NavBar />
    </>
}

export default Home