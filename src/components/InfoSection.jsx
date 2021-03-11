import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { Select, Badge } from "@chakra-ui/react";
import ListContext from "../ListContext";
import { rwd } from "../style/rwd";
import "../style/styles.css";

const StyledInfoSection = styled.section`
  position: fixed;
  padding: 20px;
  top: 20px;
  right: 60%;
  left: 20px;
  bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  z-index: 2;
  @media ${rwd.lg} {
    top: 50%;
    right: 20px;
  }

  .custom-input {
    display: inline-block;
    position: relative;
    padding-left: 36px;
    cursor: pointer;
    font-size: 16px;
    user-select: none;
    &:hover &__checkmark {
      background-color: #ddd;
    }
    &__input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }
    &__input:checked ~ &__checkmark {
      background-color: rgb(165, 136, 77);
    }
    &__checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 25px;
      width: 25px;
      background-color: #eee;
      &:after {
        content: "";
        position: absolute;
        display: none;
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
      }
    }
    &__input:checked ~ &__checkmark:after {
      display: block;
    }
  }

  .list {
    position: absolute;
    top: 100px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    overflow-y: scroll;
  }

  .card {
    cursor: pointer;
    :hover {
      background-color: #f8f8f8;
    }
  }
`;

const InfoSection = ({ foodList, onChoose }) => {
  const inputRef = useRef(null);
  const [fetchList, setFetchList] = useState([]);
  const [sortList, setSortList] = useState([]);
  const [sortType, setSortType] = useState("rating");
  const [isFilter4Star, setIsFilter4Star] = useState(false);
  const { showList, changeShowList, ratingColor } = useContext(ListContext);

  useEffect(() => {
    const filterList = foodList
      .slice(1) //拿掉城市
      .filter((item) => item.hasOwnProperty("rating") && item.rating !== ""); //拿掉沒排名的
    setFetchList(filterList);
  }, [foodList]);

  const handleSortChange = () => {
    setSortType(inputRef.current.value);
  };

  const handleListSort = () => {
    const changedList = fetchList.sort((a, b) => {
      if (a[sortType] > b[sortType]) {
        return -1;
      } else {
        return 1;
      }
    });
    setSortList(changedList);
    handle4StarFilter();
  };

  useEffect(() => {
    handleListSort();
  }, [fetchList, sortType]);

  const handle4StarFilter = (changedList) => {
    const list = changedList || sortList;
    if (isFilter4Star === true) {
      const filterList = list.filter((item) => {
        return item.rating >= 4;
      });
      changeShowList(filterList);
      return;
    } else if (isFilter4Star === false) {
      changeShowList(list);
    }
  };
  useEffect(() => {
    handle4StarFilter();
  }, [sortList, isFilter4Star]);

  const handleCardClick = (e) => {
    onChoose &&
      onChoose(
        e.currentTarget.dataset.id,
        e.currentTarget.dataset.lat,
        e.currentTarget.dataset.lng
      );
  };

  return (
    <StyledInfoSection>
      <Select
        ref={inputRef}
        onChange={handleSortChange}
        className="mb-2"
        defaultValue="rating"
      >
        <option value="rating">依評價高到低</option>
        <option value="price_level">依價格貴到低</option>
        <option value="user_ratings_total">依人氣高到低</option>
      </Select>
      <label className="custom-input">
        只顯示評價4星以上
        <input
          type="checkbox"
          className="custom-input__input"
          onChange={() => setIsFilter4Star(!isFilter4Star)}
        />
        <span className="custom-input__checkmark"></span>
      </label>
      <ul className="list">
        {showList &&
          showList.map((item) => {
            return (
              <li
                className="card mb-1"
                key={item["place_id"]}
                data-id={item["place_id"]}
                data-lat={item.geometry.location.lat()}
                data-lng={item.geometry.location.lng()}
                onClick={handleCardClick}
              >
                <div className="card-body">
                  <h3 className="h5 text-coffee card-title mb-1">
                    {item.name}
                  </h3>
                  <div className="d-flex justify-content-between">
                    <div>
                      <span className="mr-2">評價:</span>
                      <Badge colorScheme={ratingColor(item.rating)}>
                        {item.rating}
                      </Badge>
                    </div>
                    <div>
                      <span className="mr-2">人氣:</span>
                      <span className="font-bold font-xs">
                        {item["user_ratings_total"]}
                      </span>
                    </div>
                  </div>
                  {/* className={item["user_ratings_total"] > 2000 ? "red" : ""} */}

                  <p className="font-xs">地址: {item.vicinity || "未填寫"}</p>
                  {/* <div className="d-flex">
                    {starCount(item.rating).map((star) => (
                      <div className="star" />
                    ))}
                  </div> */}
                </div>
              </li>
            );
          })}
      </ul>
    </StyledInfoSection>
  );
};
export default InfoSection;
