import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { DataContext } from "../../context/DataProvider";

import { API } from "../../api/api";

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

// END OF the Style area

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const CreatePost = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");

  const { account } = useContext(DataContext);

  const location = useLocation();
  const navigate = useNavigate();

  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        // API CALL
        const response = await API.uploadFile(data);
        post.picture = response.data;
      }
    };
    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = account.username;
  }, [file]);

  const changeHandler = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const savePost = async () => {
    const response = await API.createPost(post);
    if (response.isSuccess) {
      navigate("/");
    }
  };
  return (
    <>
      <Container>
        <Image src={url} alt="banner" />
        <StyledFormControl>
          <label htmlFor="fileInput">
            <Add fontSize="large" color="primary" />
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <InputTextField
            placeholder="title"
            name="title"
            onChange={(e) => {
              changeHandler(e);
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              savePost();
            }}
          >
            Publish
          </Button>
        </StyledFormControl>
        <Textarea
          minRows={5}
          placeholder="Tell your story..."
          name="description"
          onChange={(e) => {
            changeHandler(e);
          }}
        />
      </Container>
    </>
  );
};

export default CreatePost;
