import React, {FC} from "react";
import {User} from "types/ApiProvider";
import {Grid, styled} from "@mui/material";
import UserSidebar from "components/Ticket/UserSidebar";
import {ItemHeader} from "components/Ticket/Common";

const UserItem: FC<{ user: User, type: "requester" | "submitter" | "assignee" }> = ({ user, type }) => {

  const getType = () => {
    switch (type) {
      case "requester":
        return "Requester"
      case "submitter":
        return "Submitter"
      case "assignee":
        return "Assignee"
    }
  }

  return (
    <Grid item>
      <ItemHeader>{ getType() }</ItemHeader>
      <UserSidebar user={user} />
    </Grid>
  )
}

export default UserItem