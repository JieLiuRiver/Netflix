import React from 'react'
import { getSession } from 'next-auth/react'
import { NextPageContext } from 'next'
import useMovieList from '@/hooks/useMovieList';
import NavBar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useFavorites from '@/hooks/useFavorites';
import InfoModal from '@/components/InfoModal';
import useInfoModalStore from '@/hooks/useInfoModalStore';

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
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const {isOpen, closeModal} = useInfoModalStore();

  return <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <NavBar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
    </div>
  </>
}

export default Home