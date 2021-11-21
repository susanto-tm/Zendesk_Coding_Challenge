import type { NextPage } from 'next'
import {useApi} from "../components/context/ApiProvider";
import {useCallback, useEffect, useState} from "react";
import {Grid, styled, Typography} from "@mui/material";
import Ticket from "../components/Home/Ticket";
import {useAuth} from "../components/context/AuthProvider";
import {BaseHeader} from "../components/Home/Common";
import Stats from "../components/Home/Stats";
import {Counts} from "../types/ApiProvider";
import SectionHeader from "../components/Home/SectionHeader";
import StatsSection from "../components/Home/StatsSection";
import TicketsSection from "../components/Home/TicketsSection";

const Main = styled(Grid)({
  width: "100%",
  backgroundColor: "#F7F8FA",
  padding: "30px 50px"
})

const Home: NextPage = () => {
  const [tickets, setTickets] = useState<Array<any>>()
  const [page, setPage] = useState(1)
  const [allCount, setAllCount] = useState(-1)
  const [openCount, setOpenCount] = useState(-1)
  const [pendingCount, setPendingCount] = useState(-1)
  const [closedCount, setClosedCount] = useState(-1)

  const { getTickets, getCounts } = useApi()
  const { ready } = useAuth()

  const fetchTickets = useCallback(async () => {
    try {
      setTickets(await getTickets(page))
    } catch (e) {
      console.error(e)
    }
  }, [getTickets, page])

  const fetchStats = useCallback(async () => {
    try {
      const { all, open, pending, closed } = await getCounts()
      console.log("ALL", all)
      setAllCount(all)
      setOpenCount(open)
      setPendingCount(pending)
      setClosedCount(closed)
    } catch (e) {
      console.error(e)
    }
  }, [getCounts])

  useEffect(() => {
    if (ready) {
      void fetchTickets()
      void fetchStats()
    }
  }, [ready, fetchTickets, fetchStats])

  const loading = !(tickets && allCount !== -1 && openCount !== -1 && pendingCount !== -1 && closedCount !== -1)

  if (loading) {
    return (
      <Grid container alignItems="center" justifyContent="center">
        <Typography>
          Loading...
        </Typography>
      </Grid>
    )
  }

  return (
    <Main container flexDirection="column">
      <SectionHeader text="Quick Stats" />
      <StatsSection allCount={allCount} openCount={openCount} pendingCount={pendingCount} closedCount={closedCount} />
      <SectionHeader text="All Tickets" sx={{ mt: 2 }} />
      <TicketsSection tickets={tickets} />
    </Main>
  )
}

export default Home
