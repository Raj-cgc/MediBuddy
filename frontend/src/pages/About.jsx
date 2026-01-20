import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae qui odio excepturi possimus, alias expedita cupiditate assumenda sit laboriosam mollitia, ad facere, illum repellendus blanditiis voluptatibus ratione dolorum ea rerum!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, recusandae, tempore, velit similique deserunt eum culpa quos placeat corrupti quasi exercitationem qui optio atque quae accusamus reprehenderit consequatur asperiores mollitia.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur tempora natus cumque velit non iure. Voluptatum ad quibusdam eum possimus cumque. Architecto suscipit placeat, quibusdam id doloribus quasi minus laudantium.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Efficiency:</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas incidunt, corrupti soluta explicabo necessitatibus nam quaerat quia, accusamus libero recusandae aliquam error. Est pariatur quasi ipsum perspiciatis suscipit saepe voluptates!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convenience:</b>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae repellat, quia corporis ab maxime aliquid dolor, explicabo id ipsa, veniam cumque est? Beatae culpa autem cupiditate ducimus possimus repellat? Est?</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Personalization:</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, quos quo amet vitae obcaecati, laudantium ea esse ipsam culpa accusantium, dicta expedita dolore aliquam neque repudiandae nesciunt velit distinctio voluptate.</p>
        </div>
      </div>

    </div>
  )
}

export default About