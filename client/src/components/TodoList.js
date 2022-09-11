import { useGetFiltersQuery, useGetTodosQuery } from "../features/api/apiSlice";
import Todo from "./Todo";
import TodoLoader from "../components/ui/TodoLoader";
import Error from "../components/ui/Error";
import { useEffect, useState } from "react";

export default function TodoList() {
    const {data:filters, isSuccess} = useGetFiltersQuery();
    let status = "All";
    let colors = [];
    if(isSuccess){
        status = filters?.status;
        colors = filters?.colors;
    }
    const {data:todos, isLoading, isError} = useGetTodosQuery({status, colors});

    let content = null;

    if (isLoading) {
        content = (
            <>
                <TodoLoader />
                <TodoLoader />
                <TodoLoader />
                <TodoLoader />
            </>
        );
    }

    if (!isLoading && isError) {
        content = <Error message="There was an error" />;
    }

    if (!isLoading && !isError && todos?.length === 0) {
        content = <Error message="No todos found!" />;
    }

    if (!isLoading && !isError && todos?.length > 0) {
        content = todos.map((todo) => <Todo key={todo.id} todo={todo} />);
    }

    return content;
}
