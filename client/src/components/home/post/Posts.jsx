import { Box, Grid } from "@mui/material";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { API } from "../../../api/api";

// components
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllPosts({ category: category || "" });
      if (response.isSuccess) {
        setPosts(response.data);
      }
    };
    fetchData();
  }, [category]);

  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Grid item lg={3} sm={4} xs={12}>
            <Post post={post} />
          </Grid>
        ))
      ) : (
        <Box>No post available to display</Box>
      )}
    </>
  );
};
export default Posts;
