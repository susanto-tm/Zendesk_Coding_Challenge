import React, {FC} from "react";
import {Grid} from "@mui/material";
import Ticket from "./Ticket";
import Legend from "./Legend";
import { BoldHeader } from "components/base";

interface TicketsSectionProps {
  tickets?: Array<any>
}

const TicketsSection: FC<TicketsSectionProps> = ({ tickets }) => {
  const showTickets = () => {
    if (tickets && tickets.length > 0) {
      return tickets.map((ticket, index: number) => <Ticket data={ticket} key={index} />)
    } else {
      return (
        <Grid item sx={{ height: '100%', textAlign: "center" }} alignItems="center" justifyContent="center">
          <BoldHeader variant="h2" sx={{ fontSize: 24, mt: 5 }}>
            No Tickets Found
          </BoldHeader>
        </Grid>
      )
    }
  }


  return (
    <Grid container item flexDirection="column">
      <Legend />
      { showTickets() }
    </Grid>
  )
}

export default TicketsSection