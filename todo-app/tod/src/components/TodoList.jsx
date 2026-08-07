import TodoItem from "./TodoItem"
import EmptyState from "./EmptyState"

const TodoList = ({filteredTodos, toggleTodo, deleteTodo, handleEdit, handleSave, handleCancel, editId, editText, setEditText}) => {

    


    return (
        <>
         <ul>
            {
                filteredTodos.length === 0 ? <EmptyState /> : (
                    filteredTodos.map((todo) => {
                        return (
                            <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} handleEdit={handleEdit} handleSave={handleSave} handleCancel={handleCancel} editId={editId} editText={editText} setEditText={setEditText}/>
                        )
                    })
                )
            } 
        </ul>
    </>
  );
};

export default TodoList;