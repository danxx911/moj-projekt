import { useState } from "react";
import { useEffect } from "react";

function Todo() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [text, setText] = useState("");
  const completedCount = todos.filter((item) => item.completed === true).length;
  const totalCount = todos.length;
  const completedPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <div className="todo-input-row">
        <input
          placeholder="Add a new task..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />

        <button
          onClick={() => {
            if (!text.trim()) return;

            setTodos([
              ...todos,
              {
                id: `${Date.now()}-${Math.random()}`,
                text: text.trim(),
                completed: false,
              },
            ]);
            setText("");
          }}
        >
          Add task
        </button>
      </div>

      <div className="learning-progress">
        <div className="progress-header">
          <h3>Learning progress</h3>

          <span className="progress-percentage">
            {completedPercentage.toFixed(0)}%
          </span>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${completedPercentage}%` }}
          />
        </div>

        <p className="progress-info">
          {completedCount} of {totalCount} completed
        </p>
      </div>

      {todos.map((todo) => (
        <div className="todo-item" key={todo.id}>
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                setTodos(
                  todos.map((item) =>
                    item.id === todo.id
                      ? { ...item, completed: !item.completed }
                      : item,
                  ),
                )
              }
            />
            <span className="custom-checkbox"></span>
          </label>

          <span
            className={todo.completed ? "todo-text completed" : "todo-text"}
          >
            {todo.text}
          </span>

          <button
            className="delete-button"
            onClick={() =>
              setTodos(todos.filter((item) => item.id !== todo.id))
            }
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}

export default Todo;
