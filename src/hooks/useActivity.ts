import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";


//cada vez que usemos la funcion useActivity accedemos a los datos del context
export const useActivity = () => {
    const context = useContext(ActivityContext)
    //si no esta llamado desde un context lanzamos error
    if(!context){
        throw new Error('El hook useActivity debe ser utilizado en un ActivityProvider')
    }
    return context
}