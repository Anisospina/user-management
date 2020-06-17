import React from "react";
import { Provider } from "react-redux";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";

import { Navbar } from "~components/navbar";
import { useStore } from "~redux";

const App = ({ Component, pageProps }) => {
  const store = useStore();
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container>
        <Box marginY={5}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Box>
      </Container>
    </>
  );
};

export default App;
