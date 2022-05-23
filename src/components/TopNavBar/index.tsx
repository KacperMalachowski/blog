import { FunctionComponent } from "react"
import Brand from "../Brand";
import StyledWrapped from "./styles/StyledWrapper";

const TopNavBar: FunctionComponent = ({ children }) => (
  <StyledWrapped>
    <nav>
      <Brand>Kacper Małachowski</Brand>
    </nav>
  </StyledWrapped>
)

export default TopNavBar;