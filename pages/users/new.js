import React, { useCallback } from "react";
import { connect } from "react-redux";
import { getFormAsyncErrors } from "redux-form";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import { Loading } from "~components/loading";
import { UserForm, FORM_NAME } from "~components/user";
import { saveUser } from "~redux/users";

const New = ({ formErrors, loading, message, saveUser }) => {
  const handleSubmit = useCallback(async (data) => {
    saveUser(true, data);
  }, []);

  return (
    <>
      <Snackbar
        open={!!message}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity={message?.type} variant="filled">
          {message?.message}
        </Alert>
      </Snackbar>
      <Loading show={loading} />
      <UserForm isNew formErrors={formErrors} onSubmit={handleSubmit} />
    </>
  );
};

const mapStateToProps = ({ users, ...state }) => ({
  formErrors: getFormAsyncErrors(FORM_NAME)(state),
  loading: users.loading,
  message: users.message,
});

export default connect(mapStateToProps, {
  saveUser,
})(New);
