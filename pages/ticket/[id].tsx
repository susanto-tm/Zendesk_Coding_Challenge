import type {NextPage} from "next";
import {useRouter} from "next/router";
import {useApi} from "components/context/ApiProvider";
import {useCallback, useEffect, useState} from "react";
import { Main } from 'components/base'
import {Grid, styled} from "@mui/material";
import Summary from "components/Ticket/Summary";
import Content from "components/Ticket/Content";
import Loading from "components/base/Loading";
import { BoldHeader } from "components/base";
import Image from 'next/image'
import Alert from 'assets/icons/alert-circle-outline.svg'

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
  const [error, setError] = useState(false)

  const fetchTicket = useCallback(async () => {
    try {
      if (id) {
        setTicket(await getTicket(Number(id)))
      }
    } catch (e) {
      console.error(e)
      setError(true)
    }
  }, [getTicket, id])

  useEffect(() => {
    void fetchTicket()
  }, [fetchTicket])

  const loading = !ticket

  if (loading && !error) {
    return <Loading loading={loading} text={`Preparing Ticket ${id}`} />
  }

  if (error) {
    return (
      <Grid container sx={{ height: "100vh", width: "100%"}} alignItems='center' justifyContent="center" flexDirection="column">
        <Image src={Alert} width={100} height={100}/>
        <BoldHeader variant="h2" sx={{ fontSize: 38, color: "black", mt: 2 }}>
          Ticket { id } does not exist
        </BoldHeader>
      </Grid>
    )
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