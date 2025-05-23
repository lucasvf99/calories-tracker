import { useEffect, useState, type Dispatch} from "react"
import {v4 as uuidv4} from 'uuid'
import type { Activity } from "../types"
import { categories } from "../data/categories"
import type { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type formProps = {
    dispatch : Dispatch<ActivityActions>
    state: ActivityState
}

const initialState: Activity = {
        id: uuidv4(),
        category: 1,
        name: '',
        calories: 0
    }

export default function Form({dispatch, state}: formProps) {

    const [activity, setActivity] = useState<Activity>(initialState)

    

    useEffect(()=>{
        if(state.activeId){// si hay algo en activeId se ejecuta el codigo 
            //filtra el objeto que coincida con el id del state activeId, se le pone [0] porq devuelve un array 
            const selectedActivity  =  state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectedActivity)
        }

    },[state.activeId])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    const isNumberField = [ 'category', 'calories'].includes(e.target.id) // si entra al campo de category o calories devuelve true 
    // toma el valor del id y lo sobreescribe con el valor dado por el usuario
        setActivity({
            ...activity,
            [e.target.id] : isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const {calories, name} = activity 
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({type: 'save-activity', payload:{newActivity: activity}})
        setActivity({
            ...initialState,
            id: uuidv4() // crea otra vez otro id, para que no tengan id iguales
        })
    }   

  

  return (
    <form 
        className="space-y-5 bg-white shadow p-10 rounded-lg"
        onSubmit={handleSubmit}
    >
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categoria: </label>
            <select 
                className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                id="category"
                value={activity.category} // el value selecciona el id que le indiquemos en el estado de category ej: 1 o 2 
                onChange={handleChange}
            >
            {categories.map(category => (
                <option 
                key={category.id} 
                value={category.id}
                >
                    {category.name}
                </option>
            ))}

            </select>
        </div>
         <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad: </label>
            <input 
                id="name"
                type="text"
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Ej. Comida, Jugo, "
                value={activity.name}
                onChange={handleChange}

            />
         </div>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calorias: </label>
            <input 
                id="calories"
                type="number"
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Ej. 300 o 500"
                value={activity.calories}
                onChange={handleChange}

            />
        </div>

        <input 
            type="submit"
            className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
            value= {activity.category === 1 ? "Guardar comida" : "Guardad Ejercicio"}
            disabled={!isValidActivity()}
        />

    </form>
  )
}
