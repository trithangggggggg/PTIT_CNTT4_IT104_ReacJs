const initialRandom: number[] = [];

export const ReducersRandom = (state = initialRandom, action: any) => {
  switch (action.type) {
    case "RANDOM":
      const newNum = Math.ceil(Math.random() * 1000);
      return [...state, newNum];
    default:
      return state;
  }
};
