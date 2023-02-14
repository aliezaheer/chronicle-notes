import {
  Box,
  FormControl,
  styled,
  InputBase,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const Container = styled(Box)`
  margin: 50px 100px;
`;

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 22px;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  color: #555;
  font-size: 18px;
  border: none;
  background: none;
  &:focus-visible {
    outline: none;
  }
`;

const CreatePost = () => {
  const url = `https://images.unsplash.com/photo-1598256989800-fe5f95da9787?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80`;
  return (
    <>
      <Container>
        <Image src={url} alt="banner" />
        <StyledFormControl>
          <label htmlFor="fileInput">
            <Add fontSize="large" color="primary" />
          </label>
          <input type="file" id="fileInput" style={{ display: "none" }} />
          <InputTextField placeholder="title" />
          <Button variant="contained">Publish</Button>
        </StyledFormControl>
        <Textarea minRows={5} placeholder="Tell your story..." />
      </Container>
    </>
  );
};

export default CreatePost;
