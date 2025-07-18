import React from 'react'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import Rightsidebar from './Rightsidebar'
import useGetAllPost from '@/hooks/useGetAllPost'
import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers'

const Home = () => {
  useGetAllPost();
  useGetSuggestedUsers();
  return (
    <div className='flex px-4 xl:px-12'>
      <div className='flex-grow'>
        <Feed/>
        <Outlet/>
      </div>
      <div className="hidden xl:block pr-10">
        <Rightsidebar />
      </div>
    </div>
  )
}

export default Home
