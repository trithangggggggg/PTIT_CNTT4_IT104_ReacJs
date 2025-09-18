interface User {
  id: number;
  name: string;
  gender: string;
  birth: string;
  address: string;
}

const initialState: User[] = [
  {
    id: 1,
    name: "Nguyen tri thang",
    gender: "nam",
    birth: "02022006",
    address: "HD",
  },
  {
    id: 2,
    name: "Nguyen thi tri thang",
    gender: "nu",
    birth: "02022006",
    address: "Hp",
  },
];

export const ReducersUser = (
  state: User[] = initialState,
  action: { type: string; payload?: User }
): User[] => {
  switch (action.type) {
    case "ADD":
      if (action.payload) {
        return [...state, action.payload];
      }
      return state;

    default:
      return state;
  }
};
