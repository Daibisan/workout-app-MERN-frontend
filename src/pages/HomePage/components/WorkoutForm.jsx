import { useState } from "react";

export default function WorkoutForm({ dispatchWorkouts }) {
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState("");

    async function submitHandler(e) {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:4000/api/workouts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, reps, load }),
            });
            const json = await response.json();

            if (response.ok) {
                setTitle("");
                setLoad("");
                setReps("");
                dispatchWorkouts({
                    type: "CREATE_WORKOUT",
                    payload: json.createdWorkout,
                });
            } else {
                setError(json.error);
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="flex-1">
            <h2 className="mb-2">
                <strong>Add a New Workout</strong>
            </h2>
            <form onSubmit={submitHandler}>
                <ul className="text-sm">
                    <li className="mb-4 flex flex-col gap-2">
                        <label htmlFor="title_input">Exercise Title:</label>
                        <input
                            className="w-full rounded-sm bg-white px-2 py-1 shadow-sm"
                            type="text"
                            id="title_input"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setError("");
                            }}
                            name="title"
                            required
                        />
                    </li>
                    <li className="mb-4 flex flex-col gap-2">
                        <label htmlFor="load_input">Load (in kg):</label>
                        <input
                            className="w-full rounded-sm bg-white px-2 py-1 shadow-sm"
                            type="number"
                            id="load_input"
                            value={load}
                            onChange={(e) => {
                                setLoad(e.target.value);
                                setError("");
                            }}
                            name="load"
                            required
                            min={0}
                        />
                    </li>
                    <li className="mb-4 flex flex-col gap-2">
                        <label htmlFor="reps_input">Reps:</label>
                        <input
                            className="w-full rounded-sm bg-white px-2 py-1 shadow-sm"
                            type="number"
                            id="reps_input"
                            value={reps}
                            onChange={(e) => {
                                setReps(e.target.value);
                                setError("");
                            }}
                            name="reps"
                            required
                            min={0}
                        />
                    </li>
                </ul>

                <button
                    type="submit"
                    className="cursor-pointer rounded-sm bg-green-600 p-2 text-sm text-white"
                >
                    Add Workout
                </button>
            </form>
            {error && (
                <div className="mt-4 rounded-sm border-2 border-red-600 bg-red-100/80 px-2 py-3 text-red-600">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}
