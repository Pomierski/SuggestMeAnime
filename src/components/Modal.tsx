import React, { useState } from "react";
import styled from "styled-components";
import { StorageData } from "../types/StorageData";
import Button from "./Button";

interface PropTypes {
  onApply(obj: Partial<StorageData>): void;
  $display?: boolean;
}

const Wrapper = styled.div<Partial<PropTypes>>`
  display: block;
  width: 100%;
  padding: 2rem;
  background: ${(props) => props.theme.accentColor};

  @media (min-width: ${(props) => props.theme.screenSizeMd}) {
    width: 500px;
  }
`;

const StyledInput = styled.input`
  padding: 2px 8px;
`;

const StyledP = styled.p`
  color: #fff;
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: fit-content;
  font-size: 1.4rem;

  & > input[type="checkbox"] {
    margin-right: 0.5rem;
  }
`;

const Modal = ({ onApply, $display }: PropTypes) => {
  const [inputValue, setInputValue] = useState("");
  const [checkboxValue, setCheckboxValue] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxValue(e.target.checked);
  };

  const handleButton = () => {
    onApply({ username: inputValue, dontShowAgain: checkboxValue });
  };

  return (
    <Wrapper $display={$display}>
      <StyledP>
        Enter your MyAnimeList username to skip anime that you recently added to
        your list. Your list will be updated once a week.
      </StyledP>
      <StyledLabel htmlFor="username">MAL Username</StyledLabel>
      <StyledInput
        name="username"
        placeholder="MAL Username"
        value={inputValue}
        onChange={(e) => handleInput(e)}
      />
      <StyledLabel>
        <input
          type="checkbox"
          checked={checkboxValue}
          onChange={(e) => handleCheckbox(e)}
        />{" "}
        Don't ask again
      </StyledLabel>
      <Button
        green
        margin="1rem 1rem 0 0"
        display="inline-block"
        onClick={handleButton}
      >
        Apply
      </Button>
      <Button red display="inline-block" onClick={handleButton}>
        Close
      </Button>
    </Wrapper>
  );
};

export default Modal;
