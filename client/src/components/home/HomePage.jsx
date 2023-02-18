import { Grid } from "@mui/material";

//components
import Banner from "../banner/Banner";
import Categories from "./categories";
import Post from "./Post/post";

const HomePage = () => {
  return (
    <>
      <Banner />
      <Grid container>
        <Grid item lg={2} sm={2} xs={12}>
          <Categories />
        </Grid>
        <Grid item lg={2} sm={2} xs={12}>
          <Post />
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
