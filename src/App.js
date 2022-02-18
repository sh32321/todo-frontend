import { useContext, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContext } from "./context/UserContext";
import TodoList from "./container/TodoList";
function App() {
  const [userContext, setUserContext] = useContext(UserContext);

  const verifyUser = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/refreshtoken", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((prev) => ({ ...prev, token: data.token }));
      } else {
        setUserContext((prev) => ({ ...prev, token: null }));
      }

      setTimeout(verifyUser, 5 * 30 * 1000);
    });
  }, [setUserContext]);

  useEffect(() => verifyUser(), [verifyUser]);

  return (
    <div className="App">
      {userContext.token === null ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />}></Route>
        </Routes>
      ) : userContext.token ? (
        <TodoList />
      ) : (
        <div>Loading.....</div>
      )}
    </div>
  );
}

export default App;
