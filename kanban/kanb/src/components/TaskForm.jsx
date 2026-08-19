    import { useState , useEffect} from 'react';

    const TaskForm = ({onAddTask, editingTask, onUpdateTask}) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('todo')

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setStatus(editingTask.status);
        }
    }, [editingTask]);

    const handleSubmit = (e) => {

        e.preventDefault()
        
        if(!title.trim()) {
            alert('Title is required');
            return;
        }

        if(editingTask) {
            onUpdateTask({
                ...editingTask,
                title,
                description,
                status
            });
            return;
        } else {
            const newTask = {
                id: Date.now(),
                title,
                description,
                status
            }
            onAddTask(newTask);
        }

        setTitle('');
        setDescription('');
        setStatus('todo');


    }

    return (

        <div className='bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow'>
              
              <form onSubmit={handleSubmit}>

                <div className='mb-4'>
                    <label className='block text-gray-700 font-bold mb-2'>Title</label>
                    <input type='text' className='w-full p-2 border rounded-md' value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 font-bold mb-2'>Description</label>
                    <textarea className='w-full p-2 border rounded-md' value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 font-bold mb-2'>Status</label>
                    <select className='w-full p-2 border rounded-md' value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value='todo'>Todo</option>
                        <option value='in-progress'>In Progress</option>
                        <option value='done'>Done</option>
                    </select>
                </div>

                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors'>
                    {editingTask ? 'Update Task' : 'Add Task'}
                </button>
              </form>

        </div>

    )

}

export default TaskForm;