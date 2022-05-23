import Link from 'next/link';
import { FunctionComponent } from 'react';
import { Container } from './styles/StyledContainer';


const Brand: FunctionComponent = ({ children }) => {
  return (
    <Container>
      <Link href="/">
        {children}
      </Link>
    </Container>
  );
};

export default Brand;
