import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline'
import { useActivity } from "../hooks/useActivity"

export default function ActivitiesList() {

    const {dispatch, categoryName, isEmptyActivities, state} = useActivity()
    return (
            <>
                <h2 className="text-4xl font-bold text-slate-600 text-center">Comidas y Actividades</h2>

                {
                    isEmptyActivities ?  
                    <p className="text-center my-5">No hay actividades aún...</p> :
                    state.activities.map(activity => (
                        <div key={activity.id} className="px-5 bg-white mt-5 flex justify-between shadow">
                            <div className="space-y-2 relative mt-8 ">
                                <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold
                                    ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                                    {categoryName(+activity.category)}
                                </p>
                                <p className="text-2xl font-bold pt-5">{activity.name}</p>
                                <p className="font-black text-4xl text-lime-500">
                                    {activity.calories} {''}
                                    <span>Calorias</span>
                                </p>
                            </div>
                            <div className="flex gap-5 items-center">
                                <button
                                    onClick={() => dispatch({type: 'save-activeId', payload: {id: activity.id}})}
                                >
                                    <PencilSquareIcon 
                                        className="h-8 w-8 text-gray-800 "
                                    /> 
                                </button>
                                <button
                                    onClick={() => dispatch({type:'delete-activity', payload:{id:activity.id}})}
                                >
                                    <TrashIcon 
                                        className="h-8 w-8 text-red-500 "
                                    /> 
                                </button>
                            </div>
                        </div>
                    ))
                }
            </>
    )
}
