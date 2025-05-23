// primer reducer

import type { Activity } from "../types"

// acciones
export type ActivityActions =
    {type: 'save-activity', payload: {newActivity: Activity}} | // type: accion que se ejecuta - payload: datos a guardar
    {type: 'save-activeId', payload: {id: Activity['id']}} |
    {type: 'delete-activity', payload: {id: Activity['id']}} |
    {type: 'restar-app'} //no es obligatorio un payload para manejar el state

// state
export type ActivityState = {
    activities : Activity[] // el state del reducer 
    activeId : Activity['id']
}

// funcion para retornar el state dentro del local
const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState : ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {
    // este codigo maneja la logica para actualizar el state
    if(action.type === 'save-activity'){

        let updateActivity: Activity[] = []
        if(state.activeId){
            //si el id coincide con el state.activeId retorna el payload 
            updateActivity = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity)
        }else {
            updateActivity = [...state.activities, action.payload.newActivity]
        }

       return{
        ...state, //se recomienda siempre hacer una copia del state
        activities: updateActivity, //agregar la data al state
        activeId: ''
       }
    }

    if(action.type === 'save-activeId'){
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'delete-activity'){
        
        return {
            ...state,
            activities : state.activities.filter( activity => activity.id !== action.payload.id) //devuelve los que sean distintos al id del payload
        }
    }

    if(action.type === 'restar-app'){
        return {
            activities: [],
            activeId: ''
        }
    }


    return state
}