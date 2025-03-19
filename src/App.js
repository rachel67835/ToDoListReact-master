import React, { useEffect, useState } from 'react';
import service from './service.js';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);

  async function getTodos() {
    try {
      const todos = await service.getTasks();
      // בדוק את סוג הנתונים המתקבלים
      console.log("Data received from service:", todos);
      // ודא שהנתונים הם מערך
      setTodos(Array.isArray(todos) ? todos : []);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([]); // במקרה של שגיאה, ננקה את רשימת המשימות
    }
  }

  async function createOrUpdateTodo(e) {
    e.preventDefault();
    if (editingTodoId) {
      await service.updateTaskName(editingTodoId, newTodo);
      setEditingTodoId(null); // נקה את מצב העריכה
    } else {
      await service.addTask(newTodo);
    }
    setNewTodo(""); // נקה את שדה הקלט
    await getTodos(); // רענון רשימת המשימות
  }

  async function updateCompleted(todo, isComplete) {
    await service.setCompleted(todo.id, isComplete);
    await getTodos(); // רענון רשימת המשימות
  }

  async function deleteTodo(id) {
    await service.deleteTask(id);
    await getTodos(); // רענון רשימת המשימות
  }

  async function updateTaskName(todo) {
    setNewTodo(todo.name); // הגדר את שם המשימה בשדה הקלט
    setEditingTodoId(todo.id); // שמור את ה-ID של המשימה המעדכנת
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={createOrUpdateTodo}>
          <input 
              className="new-todo" 
              placeholder="Well, let's take on the day" 
              value={newTodo} 
              onChange={(e) => setNewTodo(e.target.value)} 
          />
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map(todo => {
            return (
              <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input className="toggle" type="checkbox" defaultChecked={todo.isComplete} onChange={(e) => updateCompleted(todo, e.target.checked)} />
                  <label onDoubleClick={() => updateTaskName(todo)}>{todo.name}</label>
                  <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}

export default App;
