const TodoItem = ({todo, toggleTodo, deleteTodo, handleEdit, handleSave, handleCancel, editId, editText, setEditText}) => {

  

    return (
        <>
         <li>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
              
              {
                editId === todo.id ? (
                    <>
                    <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                    </>
                ) : (
                  <>
                     <span
  style={{
    textDecoration: todo.completed ? "line-through" : "none",
    opacity: todo.completed ? 0.6 : 1,
  }}
>
  {todo.text}
</span>
                     <button onClick={() => handleEdit(todo)}>Edit</button>
                  </>
                )
              }

              <p>Status: {todo.completed ? "Completed" : "Not Completed"}</p>
            <time>Created At: {new Date(todo.createdAt).toLocaleDateString()}</time>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>

         </li>
        </>
    )

}

export default TodoItem;