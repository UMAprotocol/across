import { FC } from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import DiscordLogo from "assets/disc-logo.svg";
import TwitterLogo from "assets/icon-twitter.svg";
interface Props {}

const Footer: FC<Props> = () => {
  const location = useLocation();

  if (location.pathname === "/about")
    return (
      <AboutFooterWrapper>
        <LinksList>
          <LinksListItem>
            <LinkAnchor
              href="https://umaproject.org"
              target="_blank"
              rel="noreferrer"
            >
              FAQ
            </LinkAnchor>
          </LinksListItem>
          <LinksListItem>
            <LinkAnchor
              href="https://umaproject.org"
              target="_blank"
              rel="noreferrer"
            >
              Docs
            </LinkAnchor>
          </LinksListItem>
          <LinksListItem>
            <LinkAnchor
              href="https://discord.gg/yyxGkUqW"
              target="_blank"
              rel="noreferrer"
            >
              <LinksIcon src={DiscordLogo} alt="discord_logo" />
            </LinkAnchor>
          </LinksListItem>
          <LinksListItem>
            <LinkAnchor
              href="https://mobile.twitter.com/AcrossProtocol"
              target="_blank"
              rel="noreferrer"
            >
              <LinksIcon src={TwitterLogo} alt="twitter_logo" />
            </LinkAnchor>
          </LinksListItem>
        </LinksList>
      </AboutFooterWrapper>
    );

  return (
    <FooterWrapper>
      <LinksList>
        <LinksListItem>
          <LinkAnchor
            href="https://umaproject.org"
            target="_blank"
            rel="noreferrer"
          >
            FAQ
          </LinkAnchor>
        </LinksListItem>
        <LinksListItem>
          <LinkAnchor
            href="https://umaproject.org"
            target="_blank"
            rel="noreferrer"
          >
            Docs
          </LinkAnchor>
        </LinksListItem>
        <LinksListItem>
          <LinkAnchor
            href="https://discord.gg/yyxGkUqW"
            target="_blank"
            rel="noreferrer"
          >
            <LinksIcon src={DiscordLogo} alt="discord_logo" />
          </LinkAnchor>
        </LinksListItem>
        <LinksListItem>
          <LinkAnchor
            href="https://mobile.twitter.com/AcrossProtocol"
            target="_blank"
            rel="noreferrer"
          >
            <LinksIcon src={TwitterLogo} alt="twitter_logo" />
          </LinkAnchor>
        </LinksListItem>
      </LinksList>
    </FooterWrapper>
  );
};

export default Footer;

const AboutFooterWrapper = styled.footer`
  margin: 2.5rem;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  display: flex;
  justify-content: space-between;
  z-index: 1;
`;

const FooterWrapper = styled(AboutFooterWrapper)`
  border: none;
  margin-top: -4rem;
  background-color: #2c2e32;
  box-shadow: 120px 120px 120px #2c2e32;
  /* height: 1rem; */
`;

const LinksList = styled.ul`
  display: flex;
  flex-basis: 25%;
  margin-left: 0.5rem;
`;

const LinksListItem = styled.li`
  margin: 0 1rem;
`;

const LinkAnchor = styled.a`
  font-family: "Barlow";
  font-style: normal;
  font-weight: 300;
  font-size: 1rem;
  line-height: 1.25rem;
  color: #ffffff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const LinksIcon = styled.img`
  height: 20px;
  width: 20px;
`;
