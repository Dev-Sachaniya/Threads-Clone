import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Actions } from "../components";
import { useState } from "react";
import Comment from "../components/Comment";
const PostPage = () => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/zuck-avatar.png" size={"lg"} name="mark" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              Mark Zuckerberg
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={2} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"md"} color={"gray.light"}>
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text my={3}>New threads app is live,hope it beats that bird</Text>
      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src={"/post1.png"} w={"full"} />
      </Box>
      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          20 replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {200 + (liked ? 1 : 0)} likes
        </Text>
      </Flex>
      <Divider my={4} />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>🤩</Text>
          <Text color={"gray.light"}>Get the app to like and share posts.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Comment
        comment="test comment 1"
        createdAt="1d"
        likes={100}
        username="tester1"
        avatar="https://bit.ly/dan-abramov"
      />
      <Comment
        comment="test comment 2"
        createdAt="2d"
        likes={10}
        username="tester2"
        avatar="https://bit.ly/prosper-baba"
      />
      <Comment
        comment="test comment 3"
        createdAt="3d"
        likes={69}
        username="tester3"
        avatar="https://bit.ly/kent-c-dodds"
      />
    </>
  );
};

export default PostPage;
