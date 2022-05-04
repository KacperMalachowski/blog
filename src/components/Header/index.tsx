import Link from "next/link";
import styled from "styled-components";
import Burger from "../Burger";

const Header = () => (
  <StyledWrapper>
    <Link href="/">
      <StyledBrand>Kacper Małachowski</StyledBrand>
    </Link>

    <Burger />
  </StyledWrapper>
);

export default Header;

const StyledWrapper = styled.nav`
  width: 100%;
  border: 2px solid #f1f1f1;
  border-radius: 0px 0px 25px 25px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
`;

const StyledBrand = styled.a`
  font-size: 30px;
  align-self: flex-start;
  cursor: pointer;
  padding: 20px;

  &:focus,
  &:hover {
    color: #0070f3;
  }
`;
