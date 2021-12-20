import React from "react";
import { BiCog, BiListPlus, BiRightArrowAlt } from "react-icons/bi";
import styled from "styled-components";
import { loadNextAnime, toggleNav } from "../../store/functions";
import Button from "../Button";

interface PropTypes {
  animeUrl?: string;
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 6rem;
  background-color: ${(props) => props.theme.accentColor};
  color: #fff;
  display: flex;
  justify-content: space-evenly;
  z-index: 98;
  height: fit-content;

  @media (min-width: ${(props) => props.theme.screenSizeLg}) {
    display: none;
  }
`;

const BottomNavigation = ({ animeUrl }: PropTypes) => {
  const openLink = (addToList: string) => {
    if (addToList) window.location.href = addToList;
  };
  return (
    <Wrapper>
      <Button mobile onClick={toggleNav}>
        <BiCog />
        <p>Filters</p>
      </Button>
      <Button mobile onClick={() => animeUrl && openLink(animeUrl)}>
        <BiListPlus />
        <p>Add to list</p>
      </Button>
      <Button mobile onClick={loadNextAnime}>
        <BiRightArrowAlt />
        <p>Next</p>
      </Button>
    </Wrapper>
  );
};

export default BottomNavigation;
