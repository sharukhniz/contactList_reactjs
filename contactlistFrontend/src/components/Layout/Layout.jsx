import React from 'react'
import Header from '../common/Header/Header'
import  Style from './Layout.module.css'
import Contacts from "../Contacts/Contacts"
import AddButton from '../AddButton/AddButton'

const Layout = () => {
  return (
    <>
    <Header />
    <div className={Style.layout}>
      <AddButton />
    <Contacts />
    </div>
    </>
  )
}

export default Layout