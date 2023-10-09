import { useRecoilValue } from "recoil";
import { SignUp } from "../components";
import { Login } from "../components/Login";
import authScreenAtom from "../atoms/authAtom";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  return <>{authScreenState === "login" ? <Login /> : <SignUp />}</>;
};

export default AuthPage;
