import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'

export default function PublicLayout({children}) {
  return (
    <>
    <Header/>
    {children}
    <Footer/>
    </>
  )
}
