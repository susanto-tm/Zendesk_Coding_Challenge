import type {NextPage} from "next";
import {useRouter} from "next/router";
import {useApi} from "components/context/ApiProvider";
import {useCallback, useEffect, useState} from "react";
import { Main } from 'components/base'
import {Grid, styled} from "@mui/material";
import Summary from "components/Ticket/Summary";
import Content from "components/Ticket/Content";
import Loading from "components/base/Loading";

const BaseContainer = styled(Main)({
  padding: 0,
  height: "100vh"
})

const SidebarContainer = styled(Grid)({
  padding: "20px 30px",
  backgroundColor: "white",
  height: "100%",
  marginTop: "0 !important"
})

const TicketPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { getTicket } = useApi()
  const [ticket, setTicket] = useState<any>()

  const fetchTicket = useCallback(async () => {
    try {
      if (id) {
        setTicket(await getTicket(Number(id)))
      }
    } catch (e) {
      console.error(e)
    }
  }, [getTicket, id])

  useEffect(() => {
    void fetchTicket()
  }, [fetchTicket])

  const loading = !ticket

  if (loading) {
    return <Loading loading={loading} text={`Preparing Ticket ${id}`} />
  }

  return (
    <BaseContainer container>
      <SidebarContainer item xs={3} container spacing={5} flexDirection="column">
        <Summary submitter={ticket.submitter} requester={ticket.requester} assignee={ticket.assignee} tags={ticket.tags} />
      </SidebarContainer>
      <Grid item xs={9} sx={{ height: "100vh", overflow: "auto" }}>
        <Content ticket={ticket} />
      </Grid>
    </BaseContainer>
  )
}

export default TicketPage