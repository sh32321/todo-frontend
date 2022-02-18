import React, { useState, useContext, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import ToDos from "../components/ToDos";
import AddForm from "../components/AddForm";
import FilterButton from "../components/FilterButton";
import { doneToDoAction, deleteToDoAction } from "../redux/action";
import { UserContext } from "../context/UserContext";

const TodoList = () => {
  const [filterValue, setFilterValue] = useState("ALL");
  const [userContext, setUserContext] = useContext(UserContext);

  const todoArr = useSelector((state) => state.toDoList);
  const dispatch = useDispatch();

  const toggleToDo = (id) => {
    dispatch(doneToDoAction(id));
  };

  const deleteToDo = (id) => {
    dispatch(deleteToDoAction(id));
  };

  const getVisibleToDos = (todoArr, filterValue) => {
    switch (filterValue) {
      case "ALL":
        return todoArr;
      case "ACTIVE":
        return todoArr.filter((todo) => !todo.isDone);
      case "COMPLETED":
        return todoArr.filter((todo) => todo.isDone);
      default:
        break;
    }
  };

  const visibleList = getVisibleToDos(todoArr, filterValue);

  const fetchUserDetails = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/me", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((prev) => ({ ...prev, details: data }));
      } else {
        if (response.status === 401) {
          window.location.reload();
        } else {
          setUserContext((prev) => ({ ...prev, details: null }));
        }
      }
    });
  }, [setUserContext, userContext.token]);

  useEffect(() => {
    if (!userContext.details) {
      fetchUserDetails();
    }
  }, [fetchUserDetails, userContext.details]);

  const logoutHandler = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      setUserContext((prev) => ({ ...prev, details: undefined, token: null }));
    });
  };

  return (
    <div>
      <h3 className="title">My To Do List</h3>
      <FilterButton setFilterValue={setFilterValue} />
      <ToDos
        todoArr={visibleList}
        toggleToDo={toggleToDo}
        deleteToDo={deleteToDo}
        userId={userContext?.details?._id}
      />
      {console.log("user frrom the todo list main>>>", userContext)}
      <AddForm userId={userContext?.details?._id} />
      <div className="log-out-container">
        <button onClick={logoutHandler} className="log-out-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default TodoList;
