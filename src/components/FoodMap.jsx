import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Key } from "../key.js"; // 引入 API key
import GoogleMapReact from "google-map-react";
import MyPositionMarker from "./MyPositionMarker";
import FoodMarker from "./FoodMarker";
import InfoSection from "./InfoSection";
import ListContext from "../ListContext";

const StyledDiv = styled.div`
  width: 100%;
  height: 100vh;
  .map {
    position: relative;
  }
`;

const Map = (props) => {
  const { showList, changeFoodInfo, changeIsPointShow } = useContext(
    ListContext
  );
  const [position, setPosition] = useState({
    lat: 25.04,
    lng: 121.5
  });
  const [currentCenter, setCurrentCenter] = useState({
    lat: 25.04,
    lng: 121.5
  });
  const [places, setPlaces] = useState([]);
  const [mapApiLoaded, setMapApiLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [mapApi, setMapApi] = useState(null);
  const handleApiLoaded = (map, maps) => {
    setMapInstance(map);
    setMapApi(maps);
    setMapApiLoaded(true);
  };
  // 預設位置

  const resetCenter = (lat, lng) => {
    const newPosition = {
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    };
    setCurrentCenter(newPosition);
    setTimeout(() => {
      changeIsPointShow(true);
    }, 500);
  };

  const handleShowInfo = (placeId) => {
    if (mapApiLoaded) {
      const service = new mapApi.places.PlacesService(mapInstance);
      const request = {
        placeId,
        fields: ["formatted_phone_number", "formatted_address"]
      };
      service.getDetails(request, (results, status) => {
        if (status === mapApi.places.PlacesServiceStatus.OK) {
          console.log(results);
          changeFoodInfo(results);
        }
      });
    }
  };

  const handleCardChoose = (placeId, lat, lng) => {
    resetCenter(lat, lng);
    handleShowInfo(placeId);
  };

  const handleCenterChange = () => {
    if (mapApiLoaded) {
      setPosition({
        // center.lat() 與 center.lng() 會回傳正中心的經緯度
        lat: mapInstance.center.lat(),
        lng: mapInstance.center.lng()
      });
    }
    changeIsPointShow(false);
  };

  const handleFindCafeLocation = () => {
    if (mapApiLoaded) {
      const service = new mapApi.places.PlacesService(mapInstance);
      const request = {
        location: position,
        radius: 1000,
        type: "restaurant"
      };
      service.nearbySearch(request, (results, status) => {
        if (status === mapApi.places.PlacesServiceStatus.OK) {
          setPlaces(results);
          console.log(results);
        }
      });
    }
  };

  useEffect(() => {
    handleFindCafeLocation();
  }, [mapApiLoaded, position]);

  return (
    <StyledDiv>
      <InfoSection onChoose={handleCardChoose} foodList={places} />
      <GoogleMapReact
        className="map"
        bootstrapURLKeys={{ key: Key }}
        onChange={handleCenterChange}
        center={currentCenter}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
        yesIWantToUseGoogleMapApiInternals // 設定為 true
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)} // 載入完成後執行
        bootstrapURLKeys={{ key: Key, libraries: ["places"] }}
      >
        <MyPositionMarker
          lat={position.lat}
          lng={position.lng}
          text="My Position"
        />

        {showList.map((item) => {
          return (
            <FoodMarker
              key={item["place_id"]}
              lat={item.geometry.location.lat()}
              lng={item.geometry.location.lng()}
              placeId={item.place_id}
              food={item}
              onChoose={() => {
                console.log("click");
                handleShowInfo(
                  item["place_id"],
                  item.geometry.location.lat(),
                  item.geometry.location.lng()
                );
              }}
            />
          );
        })}
      </GoogleMapReact>
    </StyledDiv>
  );
};
Map.defaultProps = {
  center: {
    lat: 25.04,
    lng: 121.5
  },
  zoom: 17
};
export default Map;
