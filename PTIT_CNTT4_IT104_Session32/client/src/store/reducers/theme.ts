
const initialState: "light" | "dark" =
  (localStorage.getItem("theme") as "light" | "dark") || "light";

export const themeReducer = (
  state = initialState,
  action: { type: string }
): "light" | "dark" => {
  switch (action.type) {
    case "CHANGETHEME":
      const newTheme = state === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    default:
      return state;
  }
};
