import React, { useState } from "react";
import styled from "styled-components";
import Brand from "../Brand";
import Select from "react-select";
import { genres, ratings, status, types, orderBy } from "../selectOptions";
import Button from "../Button";
import { motion } from "framer-motion";
import { getRandomInt } from "../utility";

const Label = styled.label`
  display: block;
  color: #fff;
  margin-top: 1.5rem;
  padding-bottom: 0.5rem;
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

const Row = styled.div`
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

const Navbar = ({ display, fetchAnimeArray, toggleNav }) => {
  const [selectedGenre, setSelectedGenre] = useState({ value: "" });
  const [selectedRating, setSelectedRating] = useState({ value: "" });
  const [selectedStatus, setSelectedStatus] = useState({ value: "" });
  const [selectedType, setSelectedType] = useState({ value: "" });
  const [selectedOrder, setSelectedOrder] = useState({ value: "" });

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  const createQuery = () => {
    if (
      selectedGenre.value ||
      selectedRating.value ||
      selectedStatus.values ||
      selectedType.value ||
      selectedOrder.value
    ) {
      const params = [
        { parametr: "genre", value: selectedGenre ? selectedGenre.value : "" },
        {
          parametr: "rated",
          value: selectedRating ? selectedRating.value : "",
        },
        {
          parametr: "status",
          value: selectedStatus ? selectedStatus.value : "",
        },
        { parametr: "type", value: selectedType ? selectedType.value : "" },
      ];
      const query = `q=&score=6&
        ${params
          .map((el) => (el.value ? `${el.parametr}=${el.value}&` : ""))
          .join("")}`;
      const orderBy = selectedOrder ? selectedOrder.value : "";
      fetchAnimeArray(query, 1, 0, orderBy);
      toggleNav();
    }
  };

  const randomQuery = () => {
    const query = `q=&genre=${getRandomInt(1, genres.length - 1)}&score=6`;
    const page = getRandomInt(1, 3);
    fetchAnimeArray(query, page, 0);
    toggleNav();
  };

  return (
    <Nav
      animate={display ? "open" : "closed"}
      transition={{ duration: 0.5 }}
      variants={variants}
    >
      <Brand textAlign="center">SuggestMeAnime</Brand>
      <Row>
        <Col>
          <Label htmlFor="genres">Genre</Label>
          <Select
            name="genres"
            options={genres}
            isClearable
            onChange={setSelectedGenre}
          />
        </Col>
        <Col>
          <Label htmlFor="rating">Rating</Label>
          <Select
            name="rating"
            options={ratings}
            isClearable
            onChange={setSelectedRating}
          />
        </Col>
        <Col>
          <Label htmlFor="status">Status</Label>
          <Select
            name="status"
            options={status}
            isClearable
            onChange={setSelectedStatus}
          />
        </Col>
        <Col>
          <Label htmlFor="type">Type</Label>
          <Select
            name="type"
            options={types}
            isClearable
            onChange={setSelectedType}
          />
        </Col>
        <Col>
          <Label htmlFor="prefer">Prefer</Label>
          <Select
            name="prefer"
            options={orderBy}
            isClearable
            onChange={setSelectedOrder}
          />
        </Col>
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
