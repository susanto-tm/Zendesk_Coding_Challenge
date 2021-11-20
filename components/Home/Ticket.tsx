import React, {FC} from "react";
import {Box, Grid, styled, Typography} from "@mui/material";

interface TicketProps {
  data: any
}

const TicketContainer = styled(Grid)({
  padding: "5px 20px"
})

const BaseTypography = styled(Typography)({
  fontSize: 14,
  fontWeight: 500,
})

const Generic = styled(BaseTypography)({
  color: "black"
})

const StatusIcon = styled(Box)({
  height: "10px",
  width: "10px"
})

const TicketStatus: FC<{ status: string }> = ({ status }) => {

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
    <Grid container alignItems="center">
      <Grid item>
        <StatusIcon sx={{ backgroundColor: getStatusColor() }} />
      </Grid>
      <Grid item flexGrow={1}>
        <Generic color={getStatusColor()}>
          { status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() }
        </Generic>
      </Grid>
    </Grid>
  )
}

const Ticket: FC<TicketProps> = ({ data }) => {
  const { id, created_at, subject, priority, status, tags } = data

  return (
    <TicketContainer container>
      <Grid item xs={1}>
        <Generic>
          #{ id }
        </Generic>
      </Grid>
      <Grid item xs={3}>
        <Generic>
          { subject }
        </Generic>
      </Grid>
      <Grid item xs={2}>
        <TicketStatus status={status} />
      </Grid>
    </TicketContainer>
  )
}

export default Ticket