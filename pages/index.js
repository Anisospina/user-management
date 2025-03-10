import React, { useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import withStyles from "@material-ui/styles/withStyles";

import { loadUsers } from "~redux/users";
import { Loading } from "~components/loading";

const StylizedTableCell = withStyles((theme) => ({
  head: {
    paddingTop: 5,
    paddingBottom: 5,
    background: "#eee",
    textTransform: "uppercase",
    fontSize: 12,
    color: "#555",
    border: "none",
  },
}))(TableCell);

const StylizedTableRow = withStyles((theme) => ({
  hover: {
    cursor: "pointer",
  },
}))(TableRow);

const RelativePaper = withStyles({
  root: {
    position: "relative",
  },
})(Paper);

const Home = ({ loading, message, users = [], loadUsers }) => {
  const router = useRouter();

  const handleClick = useCallback(({ id }) => {
    router.push("/users/[...form]", `/users/${id}`);
  }, []);

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
      <Snackbar
        open={message}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity={message?.type} variant="filled">
          {message?.message}
        </Alert>
      </Snackbar>
      <RelativePaper elevation={0}>
        <Loading show={loading} />
        <Box paddingY={5} paddingX={2}>
          <Box marginY={2}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h6">
                  Contact List ({users.length})
                </Typography>
              </Grid>
              <Grid item>
                <Link href="/users/new">
                  <Button component="a" variant="contained" color="primary">
                    Create Contact
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StylizedTableCell>Name</StylizedTableCell>
                  <StylizedTableCell>Email</StylizedTableCell>
                  <StylizedTableCell>Company</StylizedTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <StylizedTableRow
                    key={user.id}
                    hover
                    onClick={() => handleClick(user)}
                  >
                    <TableCell>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <Avatar
                          src={`https://robohash.org/${user.email}`}
                          alt={user.name}
                        >
                          {user.name.substr(0, 2)}
                        </Avatar>
                        <Box marginLeft={1}>{user.name}</Box>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.company?.name}</TableCell>
                  </StylizedTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </RelativePaper>
    </>
  );
};

const mapStateToProps = ({ users }) => ({
  message: users.message,
  loading: users.loading,
  users: users.data,
});

export default connect(mapStateToProps, {
  loadUsers,
})(Home);
