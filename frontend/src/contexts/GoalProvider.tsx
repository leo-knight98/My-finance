import axios from "axios";
import { createContext, ReactNode, useState } from "react";

type Goal = {
    created_at: string,
    current_amount: number,
    due_date: string,
    id: number,
    modified_at: string,
    name: string,
    target_amount: number,
    user_id: number
}

type GoalContext = {
    goals: Goal[],
    getAllGoals: () => void,
    addGoal: (goalToAdd: GoalAdded) => void,
    deleteGoal: (id: number) => void,
    editGoal: (goalToEdit: GoalToEdit) => void
}

type GoalAdded = {
    current: number,
    due_date: string,
    title: string,
    total: number
}

type GoalToEdit = {
    id: number,
    current: number,
    due_date: string,
    title: string,
    total: number
}

type GoalProviderProps = {
    children: ReactNode;
};

const GoalContext = createContext<GoalContext | null>(null)
function GoalProvider({children}: GoalProviderProps) {
    const [goals, setGoals] = useState<Goal[]>([])
    function getAllGoals() {
        axios.get('http://localhost:4321/goals', {
            withCredentials: true
        })
        .then((res) => {
            setGoals(res.data)
        })
    }
    function addGoal(goalToAdd: GoalAdded) {
        axios.post('http://localhost:4321/goals', goalToAdd, {
            params: {'': ''},
            headers: {'content-type': 'application/json'},
            withCredentials: true,
        })
        .then((res) => {
            setGoals([...goals, res.data[0]])
        })
    }
    function deleteGoal(id: number) {
        axios.get(`http://localhost:4321/goals/delete?id=${id}`, {
            withCredentials: true
        })
        .then((res) => {
            if(res.data.deletedOk) {
                const newGoals = goals.filter(element => element.id !== id)
                setGoals(newGoals)
            }
        })
    }
    function editGoal(goalToEdit: GoalToEdit) {
        axios.post('http://localhost:4321/goals/edit', goalToEdit, {
            params: {'': ''},
            headers: {'content-type': 'application/json'},
            withCredentials: true,
        })
        .then((res) => {
            const index = goals.findIndex((element) => element.id === res.data[0].id)
            const goalsArray = [...goals]
            goalsArray[index] = res.data[0]
            setGoals(goalsArray)
        })
    }
    const value = {
        goals,
        getAllGoals,
        addGoal,
        deleteGoal,
        editGoal
    }
    return(
        <GoalContext.Provider value={value}>
            {children}
        </GoalContext.Provider>
    )
}

export default GoalProvider
export { GoalContext }