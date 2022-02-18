export const NEW_TO_DO = "NEW_TO_DO";
export const DONE_TO_DO = "DONE_TO_DO";
export const REMOVE_TO_DO = "REMOVE_TO_DO";

export const newToDoAction = (content, userId) => {
  return { type: NEW_TO_DO, payload: content, user: userId };
};

export const doneToDoAction = (id) => {
  return { type: DONE_TO_DO, payload: id };
};

export const deleteToDoAction = (id) => {
  return { type: REMOVE_TO_DO, payload: id };
};
