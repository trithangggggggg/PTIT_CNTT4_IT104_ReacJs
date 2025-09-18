
const initialState: string = "Rikkei Acaademy";

export const companyReducer = (state = initialState, action: any): string => {
  switch (action.type) {
    case "CHANGECOMPANY":
      return state === "RikkeiSoft" ? "Rikkei Acaademy" :"RikkeiSoft";
    default:
      return state;
  }
};
