import React, { useState } from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { PANELS, PANELS_CONFIG, FORM_CONFIG } from "./constants";
import { Section } from "./section";

const Form = ({ isNew, readOnly, handleSubmit }) => {
  const [panel, setPanel] = useState(PANELS.PROFILE_INFO);
  return (
    <form onSubmit={handleSubmit}>
      {PANELS_CONFIG.map(({ id, title }) => (
        <ExpansionPanel
          key={id}
          expanded={panel === id}
          onChange={() => setPanel(id)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} id={id}>
            <Typography variant="h6">{title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Section readOnly={readOnly} config={FORM_CONFIG[id]} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
      <Box hidden={readOnly} marginY={1}>
        <Grid container justify="flex-end">
          <Button variant="contained" color="primary" type="submit">
            {isNew ? "Create" : "Update"}
          </Button>
        </Grid>
      </Box>
    </form>
  );
};

Form.propTypes = {
  isNew: PropTypes.bool,
  readOnly: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
};

Form.defaultProps = {
  isNew: false,
  readOnly: false,
};

export const UserForm = reduxForm({
  form: "user-form",
})(Form);
