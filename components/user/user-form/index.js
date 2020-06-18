import React, { useState, useMemo } from "react";
import { reduxForm } from "redux-form";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { PANELS, PANELS_CONFIG, FORM_CONFIG } from "./constants";
import { Section } from "./section";

const Form = ({ readOnly, handleSubmit }) => {
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
    </form>
  );
};

export const UserForm = reduxForm({
  form: "user-form",
})(Form);
