import TaskCard from './TaskCard';
import { useState, useMemo } from 'react';

const KanbanColumn = ({filteredTasks, title, status, onEdit, onDelete, onDragStart , onDrop}) => {
  
  const [isOver, setIsOver] = useState(false);
  const columnTasks = useMemo(() => filteredTasks.filter((task) => task.status === status), [filteredTasks, status]);   

        return (
            <>
        <div 
        onDragOver={(e) => {
          e.preventDefault();
          setIsOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsOver(false);
        }}
        onDrop={() => {
          onDrop(status);
          setIsOver(false);
        }}
        className={`rounded-lg p-4 min-h-[400px] ${isOver ? "bg-blue-100" : "bg-gray-100"}`}>
            <h2 className='text-lg font-bold mb-4'>{title} ({columnTasks.length})</h2>

           <div className='space-y-3'>

           {columnTasks.length === 0 ? (
  <p className="text-gray-500 text-center py-10">
    No tasks here
  </p>
) : (
  <div className="space-y-3">
    {columnTasks.map((task) => (
      <TaskCard
        key={task.id}
        task={task}
        onEdit={onEdit}
        onDelete={onDelete}
        onDragStart={onDragStart}
      />
    ))}
  </div>
)}

           </div>
</div> 
            </>
    );
};

export default KanbanColumn;