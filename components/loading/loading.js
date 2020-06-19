import React from "react";
import PropTypes from "prop-types";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/styles/withStyles";

const StylizedBackdrop = withStyles({
  root: {
    zIndex: 1,
    color: "#fff",
  },
})(Backdrop);

export const Loading = ({ show }) => {
  return show ? (
    <StylizedBackdrop open>
      <CircularProgress color="inherit" />
    </StylizedBackdrop>
  ) : null;
};

Loading.propTypes = {
  show: PropTypes.bool,
};

Loading.defaultProps = {
  show: false,
};
