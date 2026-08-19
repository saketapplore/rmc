import React from 'react';
import { useState } from 'react';

const TaskCard = ({task, onEdit, onDelete, onDragStart}) => {

    const [isDragging , setIsDragging] = useState(false);
    

    return (
        <>
        <div 
        draggable
        onDragStart={() => {
            setIsDragging(true);
            onDragStart(task.id);
        }}
        onDragEnd={() => {
            setIsDragging(false);
        }}
        className={`bg-white rounded-lg p-4 shadow-md ${isDragging ? 'opacity-50' : ''}`}>
            <h3 className='text-lg font-bold mb-2'>{task.title}</h3>
            <p className='text-gray-600'>{task.description}</p>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors' onClick={() => onEdit(task)}>Edit</button>
            <button className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors' onClick={() => onDelete(task.id)}>Delete</button>
        </div>
        </>
    )
}

export default React.memo(TaskCard);