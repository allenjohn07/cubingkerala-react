import React from 'react'
import { Footer } from 'flowbite-react'
import { FaGithub } from "react-icons/fa";


const DownFooter = () => {
  return (
    <div className='flex w-full justify-between px-5 lg:px-10 py-5'>
          <Footer.Copyright className='text-xs lg:text-sm' href="/" by="Cubing Kerala" year={new Date().getFullYear()} />
          <Footer.LinkGroup>
            <Footer.Link href="https://github.com/allenjohn07/cubingkerala"><div className='flex items-center gap-1 text-xs lg:text-sm'><FaGithub/>Github</div></Footer.Link>
          </Footer.LinkGroup>
        </div>
  )
}

export default DownFooter