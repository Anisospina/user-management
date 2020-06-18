import React, { useMemo } from "react";
import MuiTextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

export const TextField = ({
  offset,
  layout = {},
  input,
  readOnly,
  ...props
}) => {
  const gridLayout = useMemo(() => ({ xs: 12, ...layout }), [layout]);
  return (
    <>
      <Grid {...gridLayout} item>
        <MuiTextField
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
