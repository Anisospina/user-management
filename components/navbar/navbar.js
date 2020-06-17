import React from "react";
import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";

import { useClasses } from "./styles";

export const Navbar = () => {
  const classes = useClasses();
  return (
    <AppBar position="static">
      <Toolbar>
        <Breadcrumbs color="inherit">
          <Link passHref href="/">
            <Typography
              className={classes.mainLink}
              color="inherit"
              variant="h6"
              component="a"
            >
              CRM
            </Typography>
          </Link>
        </Breadcrumbs>
      </Toolbar>
    </AppBar>
  );
};
