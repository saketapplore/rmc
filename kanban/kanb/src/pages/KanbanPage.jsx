import {useState, useCallback} from 'react';
import { useMemo } from 'react';
import KanbanBoard from '../components/KanbanBoard';
import TaskForm from '../components/TaskForm';
import SearchBar from '../components/SearchBar';
import useLocalStorage from '../hooks/useLocalStorage';
import FilterDropdown from '../components/FilterDropdown';

const KanbanPage = () => {

 

  const initialTasks = [
    {
      id: 1,
      title: "Build Login Page",
      description: "Create login UI",
      status: "todo",
    },
  
    {
      id: 2,
      title: "Create Navbar",
      description: "Create responsive navbar",
      status: "todo",
    },
  
    {
      id: 3,
      title: "API Integration",
      description: "Connect backend API",
      status: "in-progress",
    },
  
    {
      id: 4,
      title: "Testing",
      description: "Test application",
      status: "done",
    },
  ];   

const [editingTask, setEditingTask] = useState(null);
const [tasks, setTasks] = useLocalStorage('kanban-tasks', initialTasks)
const [draggedTaskId, setDraggedTaskId] = useState(null);
const [searchTerm, setSearchTerm] = useState('')
const [filterStatus, setFilterStatus] = useState('all')

const handleDragStart = useCallback((id) => {
  setDraggedTaskId(id);
}, [])

const handleUpdateTask = useCallback((updatedTask) => {
  setTasks((prevTasks) => prevTasks.map((task) => task.id === updatedTask.id ? updatedTask : task));
  setEditingTask(null);
}, [])

const handleDrop = useCallback((newStatus) => {
  setTasks((prevTasks) =>
    prevTasks.map((task) =>{

      if(task.id !== draggedTaskId) {
        return task
      }

      if(task.status === newStatus) {
        return task
      }

      return {
        ...task,
        status: newStatus,
      }
    })
  );
  setDraggedTaskId(null);
}, [draggedTaskId]);
  

  const filteredTasks = useMemo(() => {

    return tasks.filter((task) => {
      const matchSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchStatus = filterStatus === 'all' || task.status === filterStatus;

      return matchSearch && matchStatus;
    });

  }, [tasks, searchTerm, filterStatus]);

  const handleEditTask = useCallback((task) => {
    setEditingTask(task);
  }, [])

  const handleDeleteTask = useCallback((id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }, [])
  





  const handleAddTask = useCallback((newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, [])

 


    return (

        <div>
           <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
           <FilterDropdown filterStatus={filterStatus} setFilterStatus={setFilterStatus} />

           {
            filteredTasks.length === 0 ? (
              <div className="text-center py-10">
              <p className="text-gray-500">
                No tasks found
              </p>
            </div> 
            )
            : (
              <KanbanBoard filteredTasks={filteredTasks} onEdit={handleEditTask} onDelete={handleDeleteTask} onDragStart={handleDragStart} onDrop={handleDrop} />
            )
           }

           <TaskForm onAddTask={handleAddTask} editingTask={editingTask} onUpdateTask={handleUpdateTask} />
        </div>

    )

}   

export default KanbanPage;