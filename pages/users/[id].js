import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import { getUserById } from "~redux/users";
import { UserForm } from "~components/user";
import { Loading } from "~components/loading";

const Users = ({ loading, user, getUserById }) => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getUserById(id);
    }
  }, [id]);

  return (
    <>
      <Loading show={loading} />
      {user ? <UserForm readOnly initialValues={user} /> : null}
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
