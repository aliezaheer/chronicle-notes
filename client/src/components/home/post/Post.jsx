import { useEffect, useState } from "react";

import { API } from "../../../api/api";

const Post = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllPosts();
      if (response.isSuccess) {
        setPosts(response.data);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) => <div>hello</div>)
      ) : (
        <div>no data available</div>
      )}
    </>
  );
};
export default Post;
