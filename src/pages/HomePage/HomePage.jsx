import { useEffect, useReducer } from "react";
import WorkoutDetails from "./components/WorkoutDetails";
import WorkoutForm from "./components/WorkoutForm";
import useAuthContext from "../../hooks/useAuthContext";

const workoutsReducer = (state, action) => {
    switch (action.type) {
        case "SET_WORKOUTS":
            return action.payload;
        case "CREATE_WORKOUT":
            return [action.payload, ...state];
        case "DELETE_WORKOUT":
            return state.filter(
                (workout) => workout._id !== action.payload._id,
            );
        default:
            return state;
    }
};

export default function HomePage() {
    const [workouts, dispatchWorkouts] = useReducer(workoutsReducer, []);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch(
                    "http://localhost:4000/api/workouts",
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    },
                );
                const json = await response.json();

                if (response.ok) {
                    dispatchWorkouts({
                        type: "SET_WORKOUTS",
                        payload: json.workouts,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchWorkouts();
    }, []);

    return (
        <div className="mx-auto mt-9 flex max-w-[80%] gap-25">
            {/* Workouts List */}
            {workouts.length > 0 && (
                <ul className="max-h-150 max-w-200 flex-4 overflow-y-auto pr-2">
                    {workouts.map((workout) => (
                        <WorkoutDetails
                            key={workout._id}
                            workout={workout}
                            dispatchWorkouts={dispatchWorkouts}
                        />
                    ))}
                </ul>
            )}

            {workouts.length === 0 && (
                <div className="max-w-200 flex-4">
                    <p>No workout...</p>
                </div>
            )}

            <WorkoutForm dispatchWorkouts={dispatchWorkouts} />
        </div>
    );
}
