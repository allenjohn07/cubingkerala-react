import React from 'react'
import { Footer } from 'flowbite-react'

const DownFooter = () => {
  return (
    <div className='flex-row lg:flex w-full justify-between p-5'>
          <Footer.Copyright href="/" by="Cubing Kerala" year={new Date().getFullYear()} />
          <Footer.LinkGroup>
            <Footer.Link href="/about">About</Footer.Link>
            <Footer.Link href="/privacy">Privacy Policy</Footer.Link>
            <Footer.Link href="/contact">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
  )
}

export default DownFooter