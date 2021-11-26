import React, {FC} from "react";
import {Box, Grid, styled} from "@mui/material";
import {BoldHeader, SemiBoldText} from "components/base";
import moment from "moment";
import {TopHeaderProps} from "types/Ticket";

const Header = styled(BoldHeader)({
  fontSize: 32
})

const BadgeText = styled(SemiBoldText)({
  color: "white",
  fontSize: 14
})

const BadgeContainer = styled(Grid)({
  borderRadius: 8,
  padding: "8px 12px"
})

const capitalize = (s: string) => { console.log(s); return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() }

const StatusBadge: FC<Pick<TopHeaderProps, "status">> = ({ status }) => {

  const getStatusColor = () => {
    switch (status) {
      case "open":
        return "#E34F32"
      case "pending":
        return "#2F91EC"
      case "solved":
        return "#87929D"
    }
  }

  return (
    <BadgeContainer container alignItems="center" justifyContent="center" sx={{ backgroundColor: getStatusColor() }}>
      <BadgeText>
        { capitalize(status) }
      </BadgeText>
    </BadgeContainer>
  )
}

const PriorityBadge: FC<Pick<TopHeaderProps, "priority">> = ({ priority }) => {
  return (
    <BadgeContainer container alignItems="center" justifyContent="center" sx={{ backgroundColor: "#2F91ECFF" }}>
      <BadgeText>
        Priority: { priority ? capitalize(priority) : "No Priority" }
      </BadgeText>
    </BadgeContainer>
  )
}

const DateBadge: FC<Pick<TopHeaderProps, "created_at">> = ({ created_at }) => {
  return (
    <BadgeContainer sx={{ backgroundColor: "#87929D", width: "fit-content" }}>
      <BadgeText>
        { moment(created_at).format("MM/DD/YYYY") }
      </BadgeText>
    </BadgeContainer>
  )
}

const TopHeader: FC<TopHeaderProps> = ({ status, subject , priority, created_at}) => {
  return (
    <Grid item container spacing={2} alignItems="flex-start">
      <Grid item xs={6}>
        <Header sx={{ lineHeight: 1.2 }}>
          { subject }
        </Header>
      </Grid>
      <Grid item container xs={6} spacing={2}>
        <Grid item xs={2}>
          <StatusBadge status={status} />
        </Grid>
        <Grid item xs={5}>
          <PriorityBadge priority={priority} />
        </Grid>
        <Grid item xs={5}>
          <DateBadge created_at={created_at} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TopHeader