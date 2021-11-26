import type { NextPage } from 'next'
import {useApi} from "components/context/ApiProvider";
import React, {useCallback, useEffect, useState} from "react";
import {Grid, Pagination, styled, Typography} from "@mui/material";
import {useAuth} from "components/context/AuthProvider";
import SectionHeader from "components/Home/SectionHeader";
import StatsSection from "components/Home/StatsSection";
import TicketsSection from "components/Home/TicketsSection";
import { Main, BoldHeader } from 'components/base'
import Loading from "components/base/Loading";

const TicketPagination = styled(Pagination)({
  "& .Mui-selected": {
    backgroundColor: "#E34F32 !important",
    color: "white"
  },
  "& .MuiPaginationItem-root:not(.Mui-selected):not(.MuiPaginationItem-previousNext)": {
    color: "rgba(0, 0, 0, 0.2)"
  }
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
      setAllCount(all)
      setOpenCount(open)
      setPendingCount(pending)
      setClosedCount(closed)
    } catch (e) {
      console.error(e)
    }
  }, [getCounts])

  const onPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  useEffect(() => {
    if (ready) {
      void fetchTickets()
      void fetchStats()
    }
  }, [ready, fetchTickets, fetchStats])

  const loading = !(tickets && allCount !== -1 && openCount !== -1 && pendingCount !== -1 && closedCount !== -1)

  if (loading) {
    return (
      <Loading loading={loading} text="Gathering Your Tickets" />
    )
  }

  return (
    <Main container flexDirection="column">
      <SectionHeader text="Quick Stats" />
      <StatsSection allCount={allCount} openCount={openCount} pendingCount={pendingCount} closedCount={closedCount} />
      <SectionHeader text="All Tickets" sx={{ mt: 2 }} />
      <TicketsSection tickets={tickets} />
      <Grid item container justifyContent="flex-end" sx={{ mt: 2 }}>
        <TicketPagination count={Math.ceil(allCount / 25)} onChange={onPageChange} />
      </Grid>
    </Main>
  )
}

export default Home
