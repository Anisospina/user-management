import React, { useMemo } from "react";
import MuiTextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

export const TextField = ({
  input,
  layout = {},
  meta = {},
  offset,
  readOnly,
  ...props
}) => {
  const { touched, error } = meta;
  const hasError = touched && !!error;
  const gridLayout = useMemo(() => ({ xs: 12, ...layout }), [layout]);
  return (
    <>
      <Grid {...gridLayout} item>
        <MuiTextField
          error={hasError}
          helperText={hasError ? error : null}
          size="small"
          fullWidth
          variant="outlined"
          disabled={readOnly}
          {...input}
          {...props}
        />
      </Grid>
      {offset ? (
        <Grid
          item
          xs={offset?.xs}
          sm={offset?.sm}
          md={offset?.md}
          lg={offset?.lg}
        />
      ) : null}
    </>
  );
};
