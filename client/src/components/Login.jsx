import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import axios from "axios";
import useShowToast from "../hooks/useShowToast";
import { useState } from "react";
import userAtom from "../atoms/userAtom";

export function Login() {
  const setAuthState = useSetRecoilState(authScreenAtom);
  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);
  const [input, setInput] = useState({ username: "", password: "" });
  const handleLogin = async () => {
    try {
      if (!input.username || !input.password) {
        showToast("Error", "all fields are required", "error");
        return;
      }
      const res = await axios.post("/api/users/login", { ...input });
      const data = { ...res.data };
      localStorage.setItem("user-threads", JSON.stringify(data));
      setUser(data);
      showToast("Success", "Logged in successfully", "success");
    } catch (error) {
      const err = error.response.data.message;
      showToast("Error", err, "error");
      return;
    }
  };
  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("gray.100", "gray.dark")}
          boxShadow={"lg"}
          p={8}
          w={{
            base: "full",
            sm: "400px",
          }}
        >
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                onChange={(e) =>
                  setInput({ ...input, username: e.target.value })
                }
                value={input.username}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
                value={input.password}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Don&apos;t have an account?{" "}
                <Link color={"blue.400"} onClick={() => setAuthState("signup")}>
                  SignUp
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
