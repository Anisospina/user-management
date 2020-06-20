import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import DefaultErrorPage from "next/error";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { getFormAsyncErrors } from "redux-form";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import { getUserById, saveUser } from "~redux/users";
import { UserForm, FORM_NAME } from "~components/user";
import { Loading } from "~components/loading";

const Users = ({ formErrors, loading, message, user, getUserById }) => {
  const router = useRouter();
  const [id, edition, ...urlSegments] = router.query.form || [];
  const [editable, setEditable] = useState(false);

  const enableEdition = () => {
    setEditable(true);
    router.replace("/users/[...form]", `/users/${id}/edit`, { shallow: true });
  };

  const handleSubmit = useCallback(async (data) => {
    saveUser(false, data);
  }, []);

  useEffect(() => {
    if (id) {
      setEditable(edition === "edit");
      getUserById(id);
    }
  }, [id]);

  return urlSegments.length > 0 ? (
    <DefaultErrorPage statusCode={404} />
  ) : (
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
      <Box hidden={editable} marginY={1}>
        <Grid container justify="flex-end">
          <Button variant="outlined" color="primary" onClick={enableEdition}>
            Edit
          </Button>
        </Grid>
      </Box>
      {user ? (
        <UserForm
          formErrors={formErrors}
          initialValues={user}
          onSubmit={handleSubmit}
          readOnly={!editable}
        />
      ) : null}
    </>
  );
};

Users.propTypes = {
  loading: PropTypes.bool,
  users: PropTypes.object,
  getUserById: PropTypes.func.isRequired,
};

Users.defaultProps = {
  loading: false,
  users: null,
};

const mapStateToProps = ({ users, ...state }) => ({
  formErrors: getFormAsyncErrors(FORM_NAME)(state),
  loading: users.loading,
  message: users.message,
  user: users.user,
});

export default connect(mapStateToProps, {
  getUserById,
  saveUser,
})(Users);
