import React, { useContext } from "react";
import styled from "styled-components";
import ListContext from "../ListContext";
import { ReactComponent as PointSvg } from "../images/point.svg";

const StyledDiv = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  z-index: 20;
  transform: translate(0, -80px) rotate(90deg);

  .point {
    animation: swing 2s infinite;
  }

  @keyframes swing {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    50% {
      -webkit-transform: translateX(10px);
      transform: translateX(10px);
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
  }
`;
const MyPositionMarker = () => {
  const { isPointShow } = useContext(ListContext);

  return (
    <StyledDiv>
      <PointSvg className={isPointShow ? "point" : "d-none point"} />
    </StyledDiv>
  );
};
export default MyPositionMarker;
