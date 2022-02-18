import { DONE_TO_DO, NEW_TO_DO, REMOVE_TO_DO } from "./action";
import { UserContext } from "../context/UserContext";
const initState = {
  toDoList: [
    { id: Date.now(), content: "Go groceries", isDone: true },
    { id: Date.now(), content: "Finish project", isDone: false },
  ],
};

const todosReducer = (state = initState, action) => {
  switch (action.type) {
    case NEW_TO_DO:
      if (action.payload.content.match(/^[ ]*$/)) {
        return state;
      } else {
        console.log("new user>>", UserContext);
        action.payload.id = Date.now();
        action.payload.isDone = false;
      }

      return {
        ...state,
        toDoList: [...state.toDoList, action.payload],
      };
    case DONE_TO_DO:
      const tempList = state.toDoList.map((item) => {
        item.id === action.payload && (item.isDone = !item.isDone);
        return item;
      });

      return {
        ...state,
        toDoList: tempList,
      };

    case REMOVE_TO_DO:
      const newList = state.toDoList.filter(
        (item) => item.id !== action.payload
      );

      return {
        ...state,
        toDoList: newList,
      };
    default:
      return state;
  }
};

export default todosReducer;
