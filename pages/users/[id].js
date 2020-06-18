import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import { getUserById } from "~redux/users";
import { UserForm } from "~components/user";

const Users = ({ user, getUserById }) => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getUserById(id);
    }
  }, [id]);

  return (
    <>
      <UserForm readOnly data={user} />
    </>
  );
};

const mapStateToProps = ({ users }) => ({
  user: users.user,
});

export default connect(mapStateToProps, {
  getUserById,
})(Users);
