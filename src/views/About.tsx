import { FC } from "react";
import styled from "@emotion/styled";
import DiscordLogo from "assets/disc-logo.svg";
import TwitterLogo from "assets/icon-twitter.svg";
import heroBg from "assets/hero-across-bg.png";

const About: FC = () => {
  return (
    <Wrapper>
      <Hero>
        <HeroHeader>
          Instantly Send Assets from L2 Rollups to L1 Ethereum
        </HeroHeader>
      </Hero>
      <BodyWrapper>
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
        <SocialLinksWrapper>
          <SocialLink href="https://discord.gg/yyxGkUqW" rel="noreferrer">
            <img src={DiscordLogo} alt="discord_img" />
          </SocialLink>
          <SocialLink href="https://twitter.com/umaprotocol" rel="noreferrer">
            <img src={TwitterLogo} alt="twitter_img" />
          </SocialLink>
        </SocialLinksWrapper>
      </BodyWrapper>
    </Wrapper>
  );
};

const Hero = styled.div`
  background-image: url(${heroBg});
  min-height: 25vh;
  height: auto;
`;

const HeroHeader = styled.h1`
  color: hsla(166, 92%, 70%, 1);
  font-size: 3.5rem;
  font-weight: 700;
  font-family: "Barlow";
  line-height: 4.5rem;
  width: 90%;
  max-width: 800px;
  margin-left: 5rem;
  padding-top: 2.5rem;
`;

const Wrapper = styled.div``;

const BodyWrapper = styled.div`
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
  color: var(--color-primary);
  &:hover {
    cursor: pointer;
  }
`;

const SocialLinksWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15vh;
`;

const SocialLink = styled.a`
  img {
    height: 45px;
    width: 40px;
    margin: 0 1rem;
  }
`;
export default About;
