import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <Loading>
      <div></div>
    </Loading>
  );
};

export default Loader;

const Loading = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    width: 5rem;
    height: 5rem;
    background-color: transparent;
    border-radius: 5rem;
    border-left: 0.3rem solid #df0707;
    position: relative;
    transform: rotate(0deg);
    animation: spinning 1s linear infinite;
  }
  @keyframes spinning {
    0% {
      transform: rotate(0deg);
    }
    0% {
      transform: rotate(-360deg);
    }
  }
`;