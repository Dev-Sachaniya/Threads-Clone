// Using Recoils
// Recoil is state management library provided by meta.
// every state is atom in recoil,this atom will deteminr whether we are in login page or signup page
import { atom } from "recoil";

const authScreenAtom = atom({
  key: "authScreenAtom",
  default: "login",
});

export default authScreenAtom;
