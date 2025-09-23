import React from 'react'
import Counter from './components/Counter'
import RandomNumberList from './components/RandomNumberList'
import ThemeSwitcher from './components/ThemeSwitcher'
import DataView from './components/DataView'
import MenuBar from './components/MenuBar'
import LanguageSwitcher from './components/LanguageSwitcher'
import FavoriteList from './components/FavoriteList'
import Login from './components/Login'
import Home from './components/Home'
import { useSelector } from 'react-redux'

export default function App() {
  const currentUser = useSelector((state: any) => state.auth.currentUser);

  return (
    <div>
      {!currentUser ? <Login /> : <Home />}
      <br /><hr />
      <Counter />
      <br /><hr />
      <RandomNumberList />
      <br /><hr />  
      <ThemeSwitcher />
      <br /><hr />
      <DataView />
      <br /><hr />
      <MenuBar />
      <br /><hr />
      <LanguageSwitcher />
      <br /><hr />
      <FavoriteList />
    </div>
  )
}
