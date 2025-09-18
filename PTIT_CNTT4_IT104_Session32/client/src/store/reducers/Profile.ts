const initialState = {
  id: 1,
  name: "Nguyen Tri Thang",
  gender: "nam",
  BirthDay: "02022006",
  address: "Hai duong",
};
export const ReducersProfile: any = (state = initialState, action: any) => {
  switch (action.type) {
    case "GET":
      return { ...state };
    default:
      return state;
  }
};
