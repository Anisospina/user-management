import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import merge from "lodash/merge";
import { reduxForm } from "redux-form";
import { object as yupObject } from "yup";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import HelpIcon from "@material-ui/icons/Help";

import { flattenObject, inflateObject } from "~utils/objects";
import { PANELS, PANELS_CONFIG, FORM_CONFIG } from "./constants";
import { Section } from "./section";

const VALIDATION_SCHEMA = yupObject(
  Object.values(FORM_CONFIG).reduce((acc, panel) => {
    const entries = panel
      .filter(({ validation }) => validation)
      .map(({ id, validation }) => [id, validation]);
    return {
      ...acc,
      ...Object.fromEntries(entries),
    };
  }, {})
);

const Form = ({ formErrors, isNew, readOnly, handleSubmit, pristine }) => {
  const [hasFormSubmitted, setFormSubmitted] = useState(false);
  const [panel, setPanel] = useState(PANELS.PROFILE_INFO);

  const errors = useMemo(() => {
    if (!hasFormSubmitted || !formErrors) return [];
    return Object.values(formErrors)
      .map((control) => {
        return typeof control === "object" && !Array.isArray(control)
          ? Object.values(control).flat()
          : control;
      })
      .flat();
  }, [formErrors, hasFormSubmitted]);

  const handleFormSubmit = useCallback((event) => {
    event.preventDefault();
    setFormSubmitted(true);
    handleSubmit(event);
  }, []);

  return (
    <form onSubmit={handleFormSubmit}>
      {errors.length ? (
        <Box marginY={2}>
          <Alert severity="error">
            <AlertTitle>You have some errors in the form</AlertTitle>
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </Alert>
        </Box>
      ) : null}
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
      <Box hidden={readOnly} marginY={2}>
        <Grid container alignItems="flex-end" justify="flex-end">
          <Grid item>
            <Box marginRight={2}>
              <Tooltip
                arrow
                interactive
                title="This form uses a public API which will not save or update any value sended to it but will respond as it if did"
                placement="top"
              >
                <Typography color="textSecondary">
                  <HelpIcon fontSize="small" />
                </Typography>
              </Tooltip>
            </Box>
          </Grid>
          <Grid item>
            <Button
              disabled={pristine}
              variant="contained"
              color="primary"
              type="submit"
            >
              {isNew ? "Create and continue" : "Update"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

Form.propTypes = {
  formErrors: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
  pristine: PropTypes.bool,
  readOnly: PropTypes.bool,
};

Form.defaultProps = {
  formErrors: null,
  isNew: false,
  pristine: true,
  readOnly: false,
};

export const FORM_NAME = "user-form";

export const UserForm = reduxForm({
  form: FORM_NAME,
  asyncValidate: async (values, { anyTouched }) => {
    try {
      await VALIDATION_SCHEMA.validate(flattenObject(values), {
        abortEarly: false,
      });
      return {};
    } catch ({ inner = [] }) {
      const errors = inner.map(({ path, message }) => {
        path = path.replace(/(\[|\]|\")/g, "");
        return [path, [message]];
      });
      throw merge(...errors.map((error) => inflateObject(error)));
    }
  },
})(Form);
