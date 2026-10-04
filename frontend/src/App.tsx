import './App.css'
import  ModuloRecargas  from './componentes/Recargas'
import {LoginUser} from './componentes/Login'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

function App() {

  const {accesToken} = useContext(AuthContext)

  return (
    <>
      {accesToken ? <ModuloRecargas  /> 
      : <LoginUser /> }
      
    </>
  )
}

export default App
