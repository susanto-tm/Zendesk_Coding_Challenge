import React, {FC} from "react";
import {Avatar, Grid, styled, Typography} from "@mui/material";
import {User} from "types/ApiProvider";
import UserProfile from '../../public/user.png'
import {SemiBoldHeader, SemiBoldText} from "components/base";
import {ItemContainer} from "components/Ticket/Common";

interface UserSidebarProps {
  user: User
}

const Container = styled(Grid)({
  borderRadius: 12,
  backgroundColor: "white",
  border: "3px #E5EAEE solid",
  padding: "10px 20px",
  width: "100%"
})

const Name = styled(SemiBoldHeader)({
  fontSize: 17
})

const UserSidebar: FC<UserSidebarProps> = ({ user }) => {
  const { name, photo } = user

  const src = photo ?? "/user.png"

  return (
    <ItemContainer container alignItems="center" sx={{ mt: 0.5 }}>
      <Grid item xs={3}>
        <Avatar alt="User Profile" src={src} sx={{ width: "38px", height: "38px" }}  />
      </Grid>
      <Grid item xs={9}>
        <Name>
          { name }
        </Name>
      </Grid>
    </ItemContainer>
  )
}

export default UserSidebar