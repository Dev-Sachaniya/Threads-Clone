import { Container } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PostPage, UserPage, AuthPage, HomePage } from "./pages";
import { Header, Logout } from "./components";
import userAtom from "./atoms/userAtom";
import { useRecoilValue } from "recoil";
function App() {
  const user = useRecoilValue(userAtom);
  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pId" element={<PostPage />} />
      </Routes>
      {user && <Logout />}
    </Container>
  );
}

export default App;
