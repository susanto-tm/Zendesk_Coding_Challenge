import React, {FC} from "react";
import {Box, Card, Grid, Link, styled, Typography} from "@mui/material";
import {Generic, StatusIcon, Container} from "./Common";
import moment from 'moment'
import Tag from "./Tag";
import {useRouter} from "next/router";

interface TicketProps {
  data: any
}

const TicketContainer = styled(Container)({
  backgroundColor: "white",
  borderRadius: 12,
  padding: "15px 20px",
  transition: "background-color 200ms ease-in-out",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  }
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
      <Grid item flexGrow={1} sx={{ ml: 1 }}>
        <Generic color={getStatusColor()}>
          { status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() }
        </Generic>
      </Grid>
    </Grid>
  )
}

const Ticket: FC<TicketProps> = ({ data }) => {
  const { id, created_at, subject, priority, status, tags } = data
  const router = useRouter()

  const onClick = async () => {
    await router.push(`/ticket/${id}`)
  }

  return (
    <TicketContainer onClick={onClick} container sx={{ mt: 1 }} alignItems="center" columns={16}>
      <Grid item xs={1}>
        <Generic>
          #{ id }
        </Generic>
      </Grid>
      <Grid item xs={5}>
        <Generic>
          { subject }
        </Generic>
      </Grid>
      <Grid item xs={2}>
        <TicketStatus status={status} />
      </Grid>
      <Grid item xs={2}>
        <Generic>
          { priority ? priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase() : "No Priority" }
        </Generic>
      </Grid>
      <Grid item xs={2}>
        <Generic>
          { moment(created_at).format("MMM DD YYYY") }
        </Generic>
      </Grid>
      <Grid container item xs={4} flexWrap="wrap" gap={2}>
        { tags && tags.map((tag: any, index: number) => <Tag text={tag} key={index} />)}
      </Grid>
    </TicketContainer>
  )
}

export default Ticket