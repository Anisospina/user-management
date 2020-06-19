import React, { useEffect, useState } from "react";
import DefaultErrorPage from "next/error";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { getUserById } from "~redux/users";
import { UserForm } from "~components/user";
import { Loading } from "~components/loading";

const Users = ({ loading, user, getUserById }) => {
  const router = useRouter();
  const [id, edition, ...urlSegments] = router.query.form || [];
  const [editable, setEditable] = useState(false);

  const enableEdition = () => {
    setEditable(true);
    router.push("/users/[...form]", `/users/${id}/edit`, { shallow: true });
  };

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
      <Loading show={loading} />
      <Box hidden={editable} marginY={1}>
        <Grid container justify="flex-end">
          <Button variant="outlined" color="primary" onClick={enableEdition}>
            Edit
          </Button>
        </Grid>
      </Box>
      {user ? <UserForm readOnly={!editable} initialValues={user} /> : null}
    </>
  );
};

const mapStateToProps = ({ users }) => ({
  loading: users.loading,
  user: users.user,
});

export default connect(mapStateToProps, {
  getUserById,
})(Users);
