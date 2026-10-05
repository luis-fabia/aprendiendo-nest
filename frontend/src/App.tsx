import './App.css'
import  ModuloRecargas  from './componentes/Recargas'
import {LoginUser} from './componentes/Login'
import { useAuth } from "./context/AuthContext";


function App() {

  const { accesToken } = useAuth();

  return (
    <>
      {accesToken ? <ModuloRecargas  /> 
      : <LoginUser /> }
      
    </>
  )
}

export default App
