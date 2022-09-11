import { useDispatch } from "react-redux";
import { useGetFiltersQuery, useGetTodosQuery, useSetFiltersMutation } from "../features/api/apiSlice";

const numberOfTodos = (no_of_todos) => {
    switch (no_of_todos) {
        case 0:
            return "No task";
        case 1:
            return "1 task";
        default:
            return `${no_of_todos} tasks`;
    }
};

export default function Footer() {
    const {data: todos, isSuccess} = useGetTodosQuery({status: "All", colors: []});
    const [setFilters] = useSetFiltersMutation();
    const {data:filters, isSuccess:isFilterSuccess} = useGetFiltersQuery();

    const dispatch = useDispatch();

    let todosRemaining;
    if(isSuccess)todosRemaining = todos.filter((todo) => !todo?.completed).length;

    let status = "All";
    let colors = [];

    if(isFilterSuccess){
        status = filters?.status;
        colors = filters?.colors;
    }

    const handleColorChange = (color) => {
        if (colors.includes(color)) {
            const filterColors = colors.filter(existColor => existColor !== color);
            setFilters({type: color, data: filterColors})
        } else {
            const allColors = [...colors, color];
            setFilters({type: color, data: allColors});
        }
    };

    return (
        <div className="mt-4 flex justify-between text-xs text-gray-500">
            <p>{numberOfTodos(todosRemaining)} left</p>
            <ul className="flex space-x-1 items-center text-xs">
                <li
                    className={`cursor-pointer ${
                        status === "All" && "font-bold"
                    }`}
                    onClick={() => setFilters({type: "status", data: "All"})}
                >
                    All
                </li>
                <li>|</li>
                <li
                    className={`cursor-pointer ${
                        status === "Incomplete" && "font-bold"
                    }`}
                    onClick={() => setFilters({type: "status", data: "Incomplete"})}
                >
                    Incomplete
                </li>
                <li>|</li>
                <li
                    className={`cursor-pointer ${
                        status === "Complete" && "font-bold"
                    }`}
                    onClick={() => setFilters({type: "status", data: "Complete"})}
                >
                    Complete
                </li>
                <li></li>
                <li></li>
                <li
                    className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
                        colors.includes("green") && "bg-green-500"
                    }`}
                    onClick={() => handleColorChange("green")}
                ></li>
                <li
                    className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
                        colors.includes("red") && "bg-red-500"
                    }`}
                    onClick={() => handleColorChange("red")}
                ></li>
                <li
                    className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
                        colors.includes("yellow") && "bg-yellow-500"
                    }`}
                    onClick={() => handleColorChange("yellow")}
                ></li>
            </ul>
        </div>
    );
}