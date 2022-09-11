import { useState } from "react";
import tickImage from "../assets/images/double-tick.png";
import noteImage from "../assets/images/notes.png";
import plusImage from "../assets/images/plus.png";
import { useAddTodoMutation, useDeleteTodoMutation, useEditTodoMutation, useGetTodosQuery } from "../features/api/apiSlice";
import Error from "../components/ui/Error";
import Success from "../components/ui/Success";

export default function Header() {
    const {data:todos, isSuccess:isTodosSuccess} = useGetTodosQuery({status: "All", colors: []});
    const [editTodo] = useEditTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();
    const [addTodo, {isError, isSuccess}] = useAddTodoMutation(); 
    
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({
            text: input,
            completed: false,
            color: "",
        });
        setInput("");
    }

    const handleClearComplete = () => {
       if(isTodosSuccess){
           for(let i = 0; i<todos?.length; i++){
               if(todos[i]?.completed){
                deleteTodo(todos[i]?.id)
               }
           }
       }
    }

    const handleAllComplete = () => {
        if(isTodosSuccess){
            for(let i = 0; i<todos?.length; i++){
                if(!todos[i]?.completed){
                    editTodo({id: todos[i]?.id, data: {completed: true}})
                }
            }
        }
    }

    return (
        <div>
            {isSuccess && (
                <Success message="Todo was added successfully" />
            )}
            {isError && (
                <Error message="There was an error adding todo!" />
            )}
            <form className="flex items-center bg-gray-100 px-4 py-4 rounded-md" onSubmit={handleSubmit}>
                <img src={noteImage} className="w-6 h-6" alt="Add todo" />
                <input
                    type="text"
                    placeholder="Type your todo"
                    className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    type="submit"
                    className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}
                ></button>
            </form>

            <ul className="flex justify-between my-4 text-xs text-gray-500">
                <li className="flex space-x-1 cursor-pointer" onClick={handleAllComplete}>
                    <img className="w-4 h-4" src={tickImage} alt="Complete" />
                    <span>Complete All Tasks</span>
                </li>
                <li className="cursor-pointer" onClick={handleClearComplete}>Clear completed</li>
            </ul>
            <p className="flex justify-center my-4 text-xs text-gray-500">Click on Todo Name to edit it</p>
        </div>
    );
}
