const TodoForm = ({input, inputRef, setInput, addTodo}) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        addTodo()
        setInput("")
        inputRef.current.focus()
    }

return(
    <>
        <form onSubmit={handleSubmit}> 
            <input type="text" ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add a new todo" />
            <button disabled={!input.trim()} type="submit">Add Todo</button>
        </form> 
    </>
)


}

export default TodoForm;