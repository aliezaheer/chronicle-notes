import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";

import { styled, Box, Typography } from "@mui/material";

const Image = styled(Box)`
  width: 100%;
  background-image: url("https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg?w=1380&t=st=1678480040~exp=1678480640~hmac=2518140ec8600a1a21b30dca89b8221cbf6ab6a5621e32b9927a2d8e22f71184"),
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  background-blend-mode: overlay;
  background-size: cover;
  background-position: center center;
  height: 45vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Heading = styled(Typography)`
  font-size: 70px;
  color: #ffffff;
  line-height: 1;
`;

const SubHeading = styled(Typography)`
  font-size: 20px;
  background: #ffffff;
`;

const Banner = () => {
  const { account } = useContext(DataContext);
  const { fullname } = account;
  return (
    <Image>
      <Heading>
        Welcome
        <br /> <b style={{ color: "#333", background: "#fff" }}>{fullname}</b>
      </Heading>
      <SubHeading>Feel free to add memories</SubHeading>
    </Image>
  );
};

export default Banner;
