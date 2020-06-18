import React from "react";
import { Field } from "redux-form";
import Grid from "@material-ui/core/Grid";

export const Section = ({ readOnly, config = [] }) => {
  return (
    <Grid container spacing={2}>
      {config.map(({ id, ...control }) => (
        <Field key={id} name={id} readOnly={readOnly} {...control} />
      ))}
    </Grid>
  );
};
