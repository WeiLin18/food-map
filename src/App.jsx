import React from "react";
import FoodMap from "./components/FoodMap";
import "./style/styles.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ListProvider } from "./ListContext";

const theme = extendTheme({
  components: {
    Popover: {
      baseStyle: {
        popper: {
          maxWidth: "unset",
          width: "unset"
        }
      }
    }
  }
});
const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <ListProvider>
          <FoodMap />
        </ListProvider>
      </div>
    </ChakraProvider>
  );
};

export default App;
