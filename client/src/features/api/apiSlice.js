import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://todo-app-rtk-query.herokuapp.com",
    }),
    tagTypes: ["Todos", "Filters", "Todo"],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: ({status, colors}) => {
                let queryString = '/todos';
                if(status === "Complete"){
                    queryString += "?completed=true"
                }else if(status === "Incomplete"){
                    queryString += "?completed=false"
                }
                if(colors.length > 0){
                    const likes = colors.map((color) => `color_like=${color}`);
                    const colorQueryString = `${likes.join("&")}`;
                    if(status !== "All"){
                        queryString += '&';
                    }
                    if(status === "All"){
                        queryString += '?';
                    }
                    queryString += colorQueryString;
                }
                return queryString;
            },
            providesTags: ["Todos"]
        }),
        addTodo: builder.mutation({
            query: (data) => ({
                url: "/todos",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Todos"],
        }),
        editTodo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/todos/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                "Todos",
                { type: "Todo", id: arg.id }
            ],
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Todos"],
        }),
        getFilters: builder.query({
            query: () => "/filters",
            providesTags: ["Filters"]
        }),
        setFilters: builder.mutation({
            query: ({type, data}) => {
                if(type === "status"){
                    return {
                        url: '/filters',
                        method: "PATCH",
                        body: {status: data}
                    }
                }
                return {
                    url: '/filters',
                    method: "PATCH",
                    body: {colors: data}
                }
            },
            invalidatesTags: ["Todos", "Filters"]
        })
        
    }),
});

export const {
    useGetTodosQuery,
    useSetTodosMutation,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useEditTodoMutation,
    useGetFiltersQuery,
    useSetFiltersMutation,
} = apiSlice;