import { formatDistanceToNow } from "date-fns";
import useAuthContext from "../../../hooks/useAuthContext";

export default function WorkoutDetails({ workout, dispatchWorkouts }) {
    const { user } = useAuthContext();

    const deleteHandler = async (e) => {
        e.stopPropagation();
        
        if (!user) return;

        const workout_id = e.currentTarget.dataset.id;
        try {
            const response = await fetch(
                `http://localhost:4000/api/workouts/${workout_id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                },
            );
            const json = await response.json();

            if (response.ok) {
                dispatchWorkouts({
                    type: "DELETE_WORKOUT",
                    payload: json.deletedWorkout,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <li className="relative mb-4 rounded-lg bg-white p-4 shadow-sm">
            <h2 className="mb-2 font-extrabold text-green-600">
                {workout.title}
            </h2>
            <ul className="text-[12px]">
                <li>
                    <p>
                        <strong>Load (kg):</strong> {workout.load}
                    </p>
                </li>
                <li>
                    <p>
                        <strong>Number of reps:</strong> {workout.load}
                    </p>
                </li>
                <li>
                    {formatDistanceToNow(new Date(workout.createdAt), {
                        addSuffix: true,
                    })}
                </li>
            </ul>
            <button
                className="absolute top-4 right-4 cursor-pointer rounded-xl bg-gray-100 p-1"
                data-id={workout._id}
                onClick={deleteHandler}
            >
                <i className="fa-regular fa-trash-can"></i>
            </button>
        </li>
    );
}
