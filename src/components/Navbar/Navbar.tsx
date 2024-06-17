import { motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import styled from "styled-components";
import * as jikanAPI from "../../api/jikanAPI";
import { updateSearch } from "../../store/actions";
import { fetchAnimeArray, toggleNav } from "../../store/functions";
import { Store, StoreSearch } from "../../store/reducers";
import { getRandomInt } from "../../utils/getRandomInt";
import Brand from "../Brand";
import Button from "../Button";

interface PropTypes {
  display: boolean;
}

interface Option {
  value: string;
  label: string;
}

const Label = styled.label`
  display: block;
  color: #fff;
  margin-top: 1.5rem;
  padding-bottom: 0.5rem;
  text-transform: capitalize;
`;

const Nav = styled(motion.nav)`
  display: block;
  background-color: ${(props) => props.theme.accentColor};
  height: 100vh;
  max-height: 100vh;
  width: 100%;
  padding: 3rem 1rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  overflow-y: auto;
  opacity: 0;

  @media (min-width: ${(props) => props.theme.screenSizeSm}) {
    width: 300px;
  }

  @media (min-width: ${(props) => props.theme.screenSizeLg}) {
    box-shadow: none;
    width: 100%;
    display: block;
    flex: 1;
    min-width: 380px;
    position: initial;
    animation: none;
    opacity: 1 !important;
    transform: initial !important;
    overflow: initial;
    height: fit-content;
  }
`;

const Row = styled.div<{ marginTop?: string }>`
  display: flex;
  margin: 0 auto;
  max-width: 1000px;
  width: 100%;
  flex-wrap: nowrap;
  flex-direction: column;
  margin-top: ${(props) => props.marginTop};

  @media (min-width: ${(props) => props.theme.screenSizeLg}) {
    flex-direction: row;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (min-width: ${(props) => props.theme.screenSizeLg}) {
    margin-right: 1rem;

    &&:last-of-type {
      margin-right: 0;
    }
  }
`;

const Navbar = ({ display }: PropTypes) => {
  const search = useSelector((state: Store) => state.search);
  const dispatch = useDispatch();

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  const createQuery = () => {
    const initialQuery = `q=&min_score=6`;
    const paramsArray = Object.keys(search)
      .filter((key) => key !== "order" && search[key as keyof StoreSearch])
      .map((key) => `&${key}=${search[key as keyof StoreSearch]}`)
      .join();
    const query = initialQuery.concat(paramsArray);
    fetchAnimeArray(query, 1, 0, search.order);
    toggleNav();
  };

  const randomQuery = () => {
    const query = `q=&genre=${getRandomInt(
      1,
      jikanAPI.genre.length - 1
    )}&min_score=6`;
    const page = getRandomInt(1, 3);
    fetchAnimeArray(query, page, 0);
    toggleNav();
  };

  const handleChange = (key: keyof StoreSearch, select: Option | null) => {
    dispatch(updateSearch(key, select?.value ?? ""));
  };

  return (
    <Nav
      animate={display ? "open" : "closed"}
      transition={{ duration: 0.5 }}
      variants={variants}
    >
      <Brand textAlign="center">SuggestMeAnime</Brand>
      <Row>
        {Object.keys(search).map((key) => (
          <Col key={key}>
            <Label htmlFor={key}>{key}</Label>
            <Select
              name={key}
              options={jikanAPI[key as keyof StoreSearch]}
              isClearable
              onChange={(option) =>
                handleChange(key as keyof StoreSearch, option)
              }
            />
          </Col>
        ))}
      </Row>
      <Row marginTop="2rem">
        <Button green navBtn shape="rounded" onClick={createQuery}>
          Search
        </Button>
        <Button purple navBtn shape="rounded" onClick={randomQuery}>
          Random
        </Button>
      </Row>
    </Nav>
  );
};

export default Navbar;
