import { Button } from "@chakra-ui/button";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom.js";
import useShowToast from "../hooks/useShowToast.js";
const Logout = () => {
  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);
  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/users/logout");
      showToast("Success", res.data.message, "success");
      localStorage.removeItem("user-threads");
      setUser(null);
    } catch (error) {
      showToast("Error", error, "error");
      return;
    }
  };
  return (
    <>
      <Button
        pos={"fixed"}
        top={"30px"}
        right={"30px"}
        size={"sm"}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </>
  );
};

export default Logout;
