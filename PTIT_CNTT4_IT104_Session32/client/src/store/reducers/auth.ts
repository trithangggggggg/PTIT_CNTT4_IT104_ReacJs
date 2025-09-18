interface User {
  email: string;
  password: string;
}


const initialState: User | null = null;


export const authReducer = (
  state: User | null = initialState,
  action: { 
    type: string; 
    payload?: User 
}
): User | null => {
  switch (action.type) {
    case "REGISTER":
      return action.payload || null;
    default:
      return state;
  }
};
