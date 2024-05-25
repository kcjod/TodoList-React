import { useState, useEffect } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(false);
  
  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      try {
        const parsedTodos = JSON.parse(todoString);
        if (Array.isArray(parsedTodos)) {
          setTodos(parsedTodos);
        } else {
          console.error("Parsed todos is not an array:", parsedTodos);
          setTodos([]);
        }
      } catch (error) {
        console.error("Error parsing todos from localStorage:", error);
        setTodos([]);
      }
    }
  }, []);

  const saveToLS = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveToLS(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = (e, id) => {
    const t = todos.find((item) => item.id === id);
    if (t) {
      setTodo(t.todo);
      const updatedTodos = todos.filter((item) => item.id !== id);
      setTodos(updatedTodos);
      saveToLS(updatedTodos);
    }
  };

  const handleDelete = (e, id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
    saveToLS(updatedTodos);
  };

  const handleCheck = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);
    if (index !== -1) {
      const updatedTodos = [...todos];
      updatedTodos[index].isCompleted = !updatedTodos[index].isCompleted;
      setTodos(updatedTodos);
      saveToLS(updatedTodos);
    }
  };

  const toggleFinish = (e)=>{
    setshowFinished(!showFinished);
  }

  return (
    <div className="w-full">
      <Navbar />
      <div className="w-[95%] md:w-3/4 bg-indigo-50 mx-auto my-3 rounded-lg py-3">
        <div className='w-full flex justify-center'>
          <h1 className='text-2xl font-semibold'>Manage all your tasks from here</h1>
        </div>
        <div>
          <h1 className="p-2 font-semibold text-lg">Add a Task:</h1>
          <div className="px-2 my-1 flex flex-col items-center gap-3 md:flex-row md:gap-0">
            <input
              type="text"
              onChange={handleChange}
              value={todo}
              className="bg-white border border-zinc-800 focus:border-none text-sm w-[90%] md:w-1/2 focus:outline-none rounded-xl px-2 py-1 focus:ring-2 focus:ring-cyan-300 mr-2"
              placeholder='Task must contain atleast 3 characters'
            />
            <button
              onClick={handleAdd}
              className="bg-cyan-500 text-white px-3 py-1 ml-2 rounded-lg hover:bg-cyan-600 w-16 md:w-auto"
              disabled={todo.length<=3}
            >
              Save
            </button>
          </div>
        </div>
        <div>
          <div>
            <h1 className="p-2 font-semibold text-lg">Todo List:</h1>
          </div>
          {todos.length!==0 && <div>
            <input type="checkbox" checked={showFinished} onChange={toggleFinish} className='mx-2' /> Show Finished
          </div>}

          <div id="todos">
            {todos.length === 0 && <div className="text-zinc-700 px-2">No tasks found.</div>}
            {todos.map((item) => {
                return((showFinished || !item.isCompleted) && <div id="todo" key={item.id} className="flex p-2 items-center justify-between lg:justify-normal">
                <div className="min-w-48 max-w-[75%] md:max-w-[75%] h-full flex gap-1">
                  <input
                    type="checkbox"
                    name={item.id}
                    onChange={handleCheck}
                    checked={item.isCompleted}
                  />
                  <div className={`min-w-[40%] overflow-hidden text-ellipsis break-words ${item.isCompleted ? "line-through" : ""}`}>
                    {item.todo}
                  </div>
                </div>
                <div className="md:ml-7 gap-1 md:gap-0 flex">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-cyan-500 text-white px-3 text-xl py-1 mx-0 md:mx-1 rounded-lg hover:bg-cyan-600"
                  >
                    <MdOutlineEdit />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="bg-cyan-500 text-white px-3 text-xl py-1 mx-0 md:mx-1 rounded-lg hover:bg-cyan-600"
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
)})}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
