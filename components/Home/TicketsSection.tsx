import React, {FC} from "react";
import {Grid} from "@mui/material";
import Ticket from "./Ticket";
import Legend from "./Legend";

interface TicketsSectionProps {
  tickets?: Array<any>
}

const TicketsSection: FC<TicketsSectionProps> = ({ tickets }) => {
  return (
    <Grid container item flexDirection="column">
      <Legend />
      { tickets && tickets.map((ticket, index: number) => <Ticket data={ticket} key={index} />) }
    </Grid>
  )
}

export default TicketsSection