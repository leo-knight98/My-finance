import { useContext } from "react";
import { GoalContext } from "../contexts/GoalProvider";

function UseGoalContext() {
    const context = useContext(GoalContext)
    if (context === null) {
        throw new Error(
            "You can't consume this context if the component is outside GoalProvider"
        );
    }
    return context
}

export default UseGoalContext