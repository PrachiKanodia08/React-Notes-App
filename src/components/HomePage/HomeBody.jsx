import React from 'react'
import HomeCards from './HomeCards'

const HomeBody = () => {
  return (
    <div className='bg-blue-50 h-screen flex flex-col items-center gap-6 p-12'>
        <div className='font-medium text-purple-700 bg-purple-100 rounded-full py-2 px-4'>
          🌟 Free Student Community Platform
        </div>
        <div class="text-4xl font-bold flex flex-col items-center">
          <p>
            Share Knowledge,
          </p>  
          <p class="bg-gradient-to-r from-pink-600 via-orange-400 to-purple-600 bg-clip-text text-transparent">
            Ace Your Exams! 🚀
          </p> 
        </div>
        <div class="text-lg text-gray-600 flex items-center">
          Join thousands of students sharing study notes and helping each other succeed. Upload your notes or download from our growing collection!
        </div>
        <HomeCards />
    </div>
  )
}

export default HomeBody