import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {useAuthFetch} from '../hooks/useAuthFetch.ts'

export function useSuppliers() {  
    
    const [suppliers, setSuppliers] = useState([]);
    const {accesToken} = useContext(AuthContext)
    const {Authfecth} = useAuthFetch()

    useEffect(() => {

        async function obtenerSuppliers() {
            const response = await Authfecth(
                "http://localhost:3000/getSuppliers"
            )   ;
            
            if (!response) {
                return;
            }

            const datos = await response.json();
            setSuppliers(datos)
        }

        obtenerSuppliers()
        

    }, [accesToken]);

    return {
        suppliers
    }
}