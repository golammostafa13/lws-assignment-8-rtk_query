import { useEffect, useState } from "react";
import cancelImage from "../assets/images/cancel.png";
import noteImage from "../assets/images/notes.png";
import { useDeleteTodoMutation, useEditTodoMutation } from "../features/api/apiSlice";

export default function Todo({todo}) {
    const { text, id, completed, color:colored } = todo;
    const [complete, setComplete] = useState(completed);
    const [color, setColor] = useState(colored);
    const [input, setInput] = useState(text);
    const [isEdit, setIsEdit] = useState(false);

    const [deleteTodo] = useDeleteTodoMutation();

    const [editTodo, {isLoading, isError, isSuccess}] = useEditTodoMutation();

    useEffect(()=> {
        editTodo({
            id, 
            data: {
            text: input,
            completed: complete,
            color,
        }})
    }, [id, complete, color, input])

    const handleStatusChange = (todoId) => {
        setComplete(!complete);
    };

    const handleColorChange = (todoId, color) => {
        setColor(color);
    };

    const handleDelete = (todoId) => {
        deleteTodo(todoId);
    };

    const editBtnHandler = () => {
        setIsEdit(!isEdit);
    }

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("submitted");
    }

    return (
        <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0" >
            <div
                className={`cursor-pointer relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
                    complete &&
                    "border-green-500 focus-within:border-green-500"
                }`}
            >
                <input
                    type="checkbox"
                    checked={complete}
                    onChange={() => handleStatusChange(id)}
                    className="opacity-0 absolute rounded-full cursor-pointer"
                />
                {complete && (
                    <svg
                        className="fill-current w-3 h-3 text-green-500 pointer-events-none"
                        viewBox="0 0 20 20"
                    >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                )}
            </div>

            {
                isEdit ? <form className="flex flex-1 items-center bg-gray-100 px-2 rounded-md"
                        onSubmit={submitHandler} >
                        <input
                        type="text"
                        placeholder="Type your todo"
                        className="w-full text-sm px-2 py-0 border-none outline-none bg-gray-100 text-gray-500"
                        value={input}
                        onChange={handleInput}
                        onMouseLeave={editBtnHandler}
                        />
                    </form> : 
                    <div className={`select-none flex-1 cursor-pointer ${completed && "line-through"}`}
                    onClick={editBtnHandler}
                    >
                        {text}
                    </div>
            }

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
                    color === "green" && "bg-green-500"
                }`}
                onClick={() => handleColorChange(id, "green")}
            ></div>

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
                    color === "yellow" && "bg-yellow-500"
                }`}
                onClick={() => handleColorChange(id, "yellow")}
            ></div>

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
                    color === "red" && "bg-red-500"
                }`}
                onClick={() => handleColorChange(id, "red")}
            ></div>

            <img
                src={cancelImage}
                className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                alt="Cancel"
                onClick={() => handleDelete(id)}
            />
        </div>
    );
}
