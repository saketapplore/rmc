import KanbanColumn from './KanbanColumn';

const KanbanBoard = ({filteredTasks, onEdit, onDelete, onDragStart, onDrop}) => {
    return (

        <>
        
       <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        
       
           <KanbanColumn 
           filteredTasks={filteredTasks}
           title="Todo"
           status="todo"
           onEdit={onEdit}
           onDelete={onDelete}
           onDragStart={onDragStart}
           onDrop={onDrop}
           />

        <KanbanColumn 
           filteredTasks={filteredTasks}
           title="In Progress"
           status="in-progress"
           onEdit={onEdit}
           onDelete={onDelete}
           onDragStart={onDragStart}
           onDrop={onDrop}
           />

        <KanbanColumn 
           filteredTasks={filteredTasks}
           title="Done"
           status="done"
           onEdit={onEdit}
           onDelete={onDelete}
           onDragStart={onDragStart}
           onDrop={onDrop}
            />

</div> 

        </>
    )
}

export default KanbanBoard;