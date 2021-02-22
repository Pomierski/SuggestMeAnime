import React from "react";
import styled from "styled-components";
import Button from "../Button";
import { BiListPlus, BiRightArrowAlt, BiCog } from "react-icons/bi";

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

const BottomNavigation = ({ openNav, next, addToList }) => {
  const openLink = () => {
    if (addToList) window.location.href = addToList;
  };
  return (
    <Wrapper>
      <Button mobile onClick={openNav}>
        <BiCog />
        <p>Filters</p>
      </Button>
      <Button mobile onClick={() => openLink(addToList)}>
        <BiListPlus />
        <p>Add to list</p>
      </Button>
      <Button mobile onClick={next}>
        <BiRightArrowAlt />
        <p>Next</p>
      </Button>
    </Wrapper>
  );
};

export default BottomNavigation;
