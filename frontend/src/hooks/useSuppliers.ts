import { useEffect, useState } from "react";
import { useAuthFetch } from '../hooks/useAuthFetch.ts'
import { useAuth } from "../context/AuthContext";

type Supplier = {
    id: string;
    name: string;
};

export function useSuppliers() {

    const [suppliers, setSuppliers] = useState<Supplier[]>([]); 
    const { accesToken } = useAuth();
    const { Authfecth } = useAuthFetch()

    useEffect(() => {


        const API_URL = import.meta.env.VITE_API_URL;
        async function obtenerSuppliers() {
            const response = await Authfecth(
                `${API_URL}/getSuppliers`
            );

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