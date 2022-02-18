import React, { useState, createContext } from "react";

const UserContext = createContext([{}, () => {}]);

let initialState = {};

const UserProvider = (props) => {
  console.log("user provider>>", props);
  const [state, setState] = useState(initialState);

  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
