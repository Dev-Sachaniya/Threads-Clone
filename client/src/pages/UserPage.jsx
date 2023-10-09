import { UserHeader, UserPost } from "../components";
const UserPage = () => {
  return (
    <>
      <UserHeader />
      <UserPost
        likes={12}
        replies={123}
        postImg="/post1.png"
        postTitle="New threads in the market."
      />
      <UserPost
        likes={34}
        replies={123}
        postImg="/post2.jpg"
        postTitle="Better not like it,or get eaten by this dog."
      />
      <UserPost
        likes={69}
        replies={6969}
        postImg="/post3.png"
        postTitle="Twitter is best,so go away"
      />
      <UserPost
        likes={69}
        replies={6969}
        postTitle="Where is my posted video Team, time to get fired."
      />
    </>
  );
};

export default UserPage;
