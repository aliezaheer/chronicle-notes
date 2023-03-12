import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { AppBar, Toolbar, styled, Button, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

const Component = styled(AppBar)`
  background: #ffffff;
  color: black;
`;

const Container = styled(Toolbar)`
  justify-content: center;
  & > a {
    padding: 20px;
    color: #000;
    text-decoration: none;
  }
`;

const Logo = styled(`img`)({
  width: 50,
});

const LogoWrapper = styled(Box)`
  flex: 1;
`;

const Header = () => {
  const navigate = useNavigate();
  const { account } = useContext(DataContext);
  const { fullname } = account;

  const logout = async () => navigate("/account");

  return (
    <Component>
      <Container>
        <LogoWrapper>
          <Logo
            src="https://cdn-icons-png.flaticon.com/512/8901/8901481.png"
            alt="logo"
          />
        </LogoWrapper>
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/contact">CONTACT</Link>
        <Link id="flex-pos" to="/login">
          LOGOUT
        </Link>
        {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
        <p>{fullname}</p>
      </Container>
    </Component>
  );
};

export default Header;
