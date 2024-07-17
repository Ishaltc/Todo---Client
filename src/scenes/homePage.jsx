import { useEffect, useState } from "react";
import React from "react";
import AddTaskForm from "../components/AddTaskForm.jsx";
import ToDo from "../components/ToDo.jsx";
import UpdateForm from "../components/UpdateForm.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { addTodo, deleteTodo, myTodos, updateTodo } from "../api/todo.js";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodoFromState,
  setLoggedInUser,
  setMyTodos,
  setUser,
} from "../state/index.js";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [newTask, setNewTask] = useState("");
  const dispatch = useDispatch();
  const [updateData, setUpdateData] = useState("");
  const user = useSelector((state) => state.loggedInUser);
  const todos = useSelector((state) => state.myTodos);
  const navigate = useNavigate();
  let userId = user.id;
  let token = user.token;

  useEffect(() => {
    handleGetAllTodo();
  }, [newTask]);

  const handleGetAllTodo = async () => {
    try {
      const response = await myTodos(userId, token);
      dispatch(setMyTodos(response));
    } catch (error) {
      console.log(error);
    }
  };
  const addTask = async () => {
    try {
      if (newTask) {
        let data = { name: newTask };
        const response = await addTodo(userId, data, token);
        setNewTask("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Delete task
  const deleteTask = async (id) => {
    try {
      const response = await deleteTodo(id, token);
      dispatch(deleteTodoFromState(id));
    } catch (error) {
      console.log(error);
    }
  };

  //Cancel Update
  const cancelUpdate = () => {
    setUpdateData("");
  };
  //Change task for update
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };

  //Update task
  const updateTask = async () => {
    try {
      let id = updateData.id;
      let data = { name: updateData.title };

      const response = await updateTodo(id, data, token);
      if (response) {
        handleGetAllTodo();
      }

      setUpdateData("");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    dispatch(setUser(false));
    navigate("/login");
  };

  return (
    <div className=" container App">
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
      <br />
      <br />
      <h2>To Do List App</h2>
      <br />
      <br />

      {/* Update Task */}
      {updateData && updateData ? (
        <UpdateForm
          updateData={updateData}
          changeTask={changeTask}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        // Add Task
        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />
      )}

      {/* Display ToDos */}

      {todos && todos.length ? (
        ""
      ) : (
        <p style={{ color: "red" }}> No Tasks...</p>
      )}
      <ToDo
        toDo={todos}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default HomePage;
