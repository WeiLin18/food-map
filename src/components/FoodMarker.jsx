import React, { useContext } from "react";
import ListContext from "../ListContext";
import { Badge } from "@chakra-ui/react";
import "../style/styles.scss";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton
} from "@chakra-ui/react";

const FoodMarker = ({ food, onChoose }) => {
  const { foodInfo, ratingColor } = useContext(ListContext);

  const handleMarkerClick = () => {
    onChoose && onChoose();
  };

  return (
    <Popover isLazy={true}>
      <PopoverTrigger>
        <Button
          className="btn text-coffee bg-white font-bold text-center"
          onClick={handleMarkerClick}
        >
          {food.name}
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" bg-white pt-4 pb-4">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody style={{ width: "300px" }}>
          <div className="d-flex">
            <div>
              <span className="mr-2">評價:</span>
              <Badge colorScheme={ratingColor(food.rating)} className="mr-5">
                {food.rating}
              </Badge>
            </div>
            <div>
              <span className="mr-2">人氣:</span>
              <span className="font-bold font-xs">
                {food["user_ratings_total"]}
              </span>
            </div>
          </div>
          <p> 地址: {food.vicinity || "未填寫"}</p>
          {foodInfo && (
            <p> 電話: {foodInfo["formatted_phone_number"] || "未填寫"}</p>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
export default FoodMarker;
