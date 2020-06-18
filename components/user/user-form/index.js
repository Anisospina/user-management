import React, { useState } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ProfileInfo from "./profile-info";
import Address from "./address";
import Company from "./company";

const PANELS = {
  PROFILE_INFO: "profile_info",
  ADDRESS: "address",
  COMPANY: "company",
};

const PANELS_CONFIG = [
  {
    id: PANELS.PROFILE_INFO,
    title: "Profile Info",
    section: ProfileInfo,
  },
  {
    id: PANELS.ADDRESS,
    title: "Address",
    section: Address,
  },
  {
    id: PANELS.COMPANY,
    title: "Company",
    section: Company,
  },
];

export const UserForm = () => {
  const [panel, setPanel] = useState(PANELS.PROFILE_INFO);
  return (
    <>
      {PANELS_CONFIG.map(({ id, title, section: Section }) => (
        <ExpansionPanel
          key={id}
          expanded={panel === id}
          onChange={() => setPanel(id)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} id={id}>
            <Typography variant="h6">{title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Section />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </>
  );
};
