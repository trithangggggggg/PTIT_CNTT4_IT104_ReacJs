import { combineReducers } from "redux";
import { ReducersProfile } from "./Profile";
import { ReducersRandom } from "./RandomNumber";
import { reducerCounter } from "./ReducerCounter";
import { reducerStudent } from "./ReducerStudent";
import { ReducersUser } from "./User";
import { companyReducer } from "./Company";
import { themeReducer } from "./theme";
import { authReducer } from "./auth";
import { loginReducer } from "./loginReducer";

export const rootReducer = combineReducers({
  counter: reducerCounter,
  students: reducerStudent,
  profile: ReducersProfile,
  users: ReducersUser,
  random: ReducersRandom,
  company: companyReducer,
  theme: themeReducer,
  auth: authReducer,
  login: loginReducer,
});
