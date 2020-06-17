import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";

import { Navbar } from "~components/navbar";

const App = ({ Component, pageProps }) => (
  <>
    <CssBaseline />
    <Navbar />
    <Container>
      <Box marginY={5}>
        <Component {...pageProps} />
      </Box>
    </Container>
  </>
);

export default App;
