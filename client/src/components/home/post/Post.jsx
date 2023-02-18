import { Box, Typography, styled } from "@mui/material";
import { addEllipsis } from "../../utils/CommonUtils";

const Container = styled(Box)`
  border: 1px solid #d3cede;
  border-radius: 6px;
  margin: 12px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > p {
    padding: 0 5px 5px 5px;
  }
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const Heading = styled(Typography)`
  color-size: 18px;
  font-wieght: 600;
  word-break: break-word;
`;

const Details = styled(Typography)`
  font-size: 14px;
  word-break: break-word;
`;

const Image = styled("img")({
  width: "100%",
  objectFit: "cover",
  height: 150,
});

const Post = ({ post }) => {
  const url = post.picture
    ? post.picture
    : "http://via.placeholder.com/640x360";
  return (
    <Container>
      <Image src={url} alt="post" />
      <Text>{post.categories}</Text>
      <Heading>{addEllipsis(post.title, 20)}</Heading>
      <Text>{post.username}</Text>
      <Details>{addEllipsis(post.description, 100)}</Details>
    </Container>
  );
};

export default Post;
