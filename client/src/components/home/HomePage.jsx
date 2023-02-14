import { Grid } from "@mui/material";

//components
import Banner from "../banner/Banner";
import Categories from "./categories";

const HomePage = () => {
  return (
    <>
      <Banner />
      <Grid container>
        <Grid item lg={2} sm={2} xs={12}>
          <Categories />
        </Grid>
        <Grid item lg={2} sm={2} xs={12}>
          Side area
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
