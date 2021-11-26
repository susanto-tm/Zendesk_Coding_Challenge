import React, {FC} from "react";
import {Grid, styled, Typography} from "@mui/material";
import UserSidebar from "components/Ticket/UserSidebar";
import {User} from "types/ApiProvider";
import {BoldHeader, SemiBoldHeader} from "components/base";
import UserItem from "components/Ticket/UserItem";
import TagsItem from "components/Ticket/TagsItem";

interface SummaryProps {
  requester: User
  submitter: User
  assignee: User
  tags: Array<string>
}

const Summary: FC<SummaryProps> = ({ requester, submitter, assignee, tags }) => {
  return (
    <>
      <UserItem user={requester} type="requester" />
      <UserItem user={submitter} type="submitter" />
      <UserItem user={assignee} type="assignee" />
      <TagsItem tags={tags} />
    </>
  )
}

export default Summary