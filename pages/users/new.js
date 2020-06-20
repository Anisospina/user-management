import React, { useCallback } from "react";
import { connect } from "react-redux";
import { getFormAsyncErrors } from "redux-form";

import { Loading } from "~components/loading";
import { UserForm, FORM_NAME } from "~components/user";
import { saveUser } from "~redux/users";

const New = ({ formErrors, loading, saveUser }) => {
  const handleSubmit = useCallback(async (data) => {
    // saveUser(true, data);
  }, []);

  return (
    <>
      <Loading show={loading} />
      <UserForm isNew formErrors={formErrors} onSubmit={handleSubmit} />
    </>
  );
};

const mapStateToProps = ({ users, ...state }) => ({
  loading: users.loading,
  formErrors: getFormAsyncErrors(FORM_NAME)(state),
});

export default connect(mapStateToProps, {
  saveUser,
})(New);
