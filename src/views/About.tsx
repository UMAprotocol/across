import { FC } from "react";
import Layout from "components/Layout";
import styled from "@emotion/styled";

const About: FC = () => {
  return (
    <Layout>
      <Wrapper>
        <Header>Information</Header>
        <Subheader>Subheader with SEO words</Subheader>
        <BodyText>
          Here is text lorem SEO phrases dolor sit text lorem ipsum dolor sit
          sedam lorem doloripsum elor sit text lorem se dolor sit seda lorem
          dolor{" "}
        </BodyText>
        <Link href="https://umaproject.org" target="_blank" rel="noreferrer">
          Read more in Docs
        </Link>
        <Subheader>Subheader with SEO Words</Subheader>
        <BodyText>
          Here is text lorem SEO phrases dolor sit text lorem ipsum dolor sit
          sedam lorem doloripsum elor sit text lorem se dolor sit seda lorem
          dolor sit text lorem ipsum dolor sit sedam lorem doloripsum elor sit
          text lorem se dolor sit seda lorem dolor sedam.
          <br /> <br />
          Ext lorem ipsum dolor sit sedam lorem doloripsum elor sit text lorem
          se dolor sit seda lorem dolor sit text lorem ipsum dolor sit sedam
          lorem doloripsum elor sit text lorem se dolor sit seda lorem dolor
          sedam
        </BodyText>
        <Subheader>Team maybe</Subheader>
        <BodyText>To give confidence and lorem ipsum. Link to UMA</BodyText>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  padding: 1.5rem;
`;
const Header = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5rem;
  font-family: "Barlow";
  margin-top: 2rem;
`;

const Subheader = styled.h3`
  font-family: "Barlow";
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`;

const BodyText = styled.h4`
  font-family: "Barlow";
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1rem;
  margin-bottom: 1rem;
`;

const Link = styled.a`
  font-family: "Barlow";
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1rem;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  text-decoration: underline;
  color: hsla(166, 92%, 70%, 1);
`;
export default About;
