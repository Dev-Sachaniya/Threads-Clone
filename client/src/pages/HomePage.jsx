import { Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Link to={"/markzuckerberg"}>
        <Flex w={"full"} justifyContent={"center"}>
          <Button>View Profile</Button>
        </Flex>
      </Link>
    </>
  );
};

export default HomePage;
