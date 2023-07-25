import React, { useState } from "react";
import "./ToDO.css";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function ToDo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditID] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const addTodo = () => {
    if (todo !== "") {
      if (editId) {
        
        const updatedTodos = todos.map((item) =>
          item.id === editId ? { ...item, list: todo } : item
        );
        setTodos(updatedTodos);
        setEditID(0);
      } else {
        
        setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      }
      setTodo("");
    }
  };

  const onDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onComplete = (id) => {
    let complete = todos.map((todo) =>
      todo.id === id ? { ...todo, status: !todo.status } : todo
    );
    setTodos(complete);
  };

  const onEdit = (id) => {
    const editTodo = todos.find((todo) => todo.id === id);
    setTodo(editTodo.list);
    setEditID(editTodo.id);
  };

  return (
    <div className="container">
      <h1>Todo</h1>
      <form className="form-group" action="" onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="text"
          placeholder="Enter ToDO"
          onChange={(event) => setTodo(event.target.value)}
          value={todo}
        />
        <button onClick={addTodo}>{editId ? "EDIT" : "ADD"}</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((todo) => (
            <div key={todo.id}>
              <li className="list-item">
                <div className={todo.status ? "list-item-list" : ""}>
                  {todo.list}
                </div>
                <span>
                  <IoMdDoneAll
                    className="list-item-icons"
                    id="complete"
                    title="Complete"
                    onClick={() => onComplete(todo.id)}
                  />
                  <FiEdit
                    className="list-item-icons"
                    id="edit"
                    title="Edit"
                    onClick={() => onEdit(todo.id)}
                  />
                  <MdDelete
                    className="list-item-icons"
                    id="delete"
                    title="Delete"
                    onClick={() => onDelete(todo.id)}
                  />
                </span>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDo;
