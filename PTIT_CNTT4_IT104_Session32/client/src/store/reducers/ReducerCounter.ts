const initialState = {
  count: 0,
  status: true,
};

export const reducerCounter: any = (state = initialState, action: any) => {
  switch (action.type) {
    case "INCREAMENT":
      console.log("thuc hien tang count");

      state.count = state.count += 1;
      return {...state};
    case "DECREAMENT":
      console.log("thuc hien tru count");

      state.count = state.count -= 1;
      return {...state};  
    default:
      return state;
  }
};
