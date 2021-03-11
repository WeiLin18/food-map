import React, { createContext, useState } from "react";

const ListContext = createContext({
  showList: null,
  changeShowList: null,
  foodInfo: null,
  changeFoodInfo: null,
  ratingColor: null,
  isPointShow: null,
  changeIsPointShow: null
});

export const ListProvider = ({ children }) => {
  const [showList, setShowList] = useState([]);
  const [isPointShow, setIsPointShow] = useState(false);
  const [foodInfo, setFoodInfo] = useState({});
  const ratingColor = (rating) => {
    if (rating >= 4) {
      return "green";
    } else if (rating < 4 && rating >= 3) {
      return "yellow";
    } else {
      return "red";
    }
  };

  return (
    <ListContext.Provider
      value={{
        showList,
        changeShowList: (newList) => {
          setShowList(newList);
        },
        foodInfo,
        changeFoodInfo: (item) => {
          setFoodInfo(item);
        },
        isPointShow,
        changeIsPointShow: (state) => {
          setIsPointShow(state);
        },
        ratingColor
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export default ListContext;
