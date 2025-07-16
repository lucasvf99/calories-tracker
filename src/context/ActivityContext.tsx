import { useReducer, createContext, type Dispatch, type ReactNode, useMemo } from "react";
import { activityReducer, initialState, type ActivityActions, type ActivityState } from "../reducers/activity-reducer";
import { categories } from "../data/categories";
import type { Activity } from "../types";


type ActivityContextProps = {
    state: ActivityState,
    dispatch: Dispatch<ActivityActions>
    caloriesConsumed: number,
    caloriesBurned: number,
    caloriesTotal: number,
    categoryName: (category: Activity["category"]) => string[],
    isEmptyActivities: boolean
}

type ActivityProviderProps = {
    children: ReactNode
}

export const ActivityContext = createContext<ActivityContextProps>(null!) 

export const ActivityProvider = ({children}: ActivityProviderProps ) => {

    const [state, dispatch] = useReducer(activityReducer, initialState)

    const {activities} = state

    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => 
        activity.category === 1 ? total + activity.calories : total, 0 ), [activities])

    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => 
        activity.category === 2 ? total + activity.calories : total, 0 ), [activities])

    const caloriesTotal = useMemo(() => caloriesConsumed - caloriesBurned, [activities])

    const categoryName = useMemo(() => //si el id coincide con mi categoria, devuelve el nombre de la categoria 
        (category: Activity['category']) => categories.map( cat => cat.id === category ? cat.name : '' ) 
    ,[activities])

    const isEmptyActivities = useMemo( () => activities.length === 0 , [activities])


    return (
        <ActivityContext.Provider
            value={{ //retornamos un obj
                state,
                dispatch,
                caloriesConsumed,
                caloriesBurned,
                caloriesTotal,
                isEmptyActivities,
                categoryName
            }}
        >
            {children}
        </ActivityContext.Provider>
    )
}