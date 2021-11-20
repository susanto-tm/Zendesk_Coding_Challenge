import type { NextPage } from 'next'
import {useApi} from "../components/context/ApiProvider";
import {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import Ticket from "../components/Home/Ticket";
import {useAuth} from "../components/context/AuthProvider";

const Home: NextPage = () => {
  const { getTickets } = useApi()
  const { ready } = useAuth()
  const [tickets, setTickets] = useState<Array<any>>()
  const [page, setPage] = useState(1)

  const fetchTickets = async () => {
    try {
      const tickets = await getTickets(page)
      console.log(tickets)
      setTickets(tickets)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (ready) {
      void fetchTickets()
    }
  }, [ready])

  return (
    <Grid container>
      { tickets && tickets.map((ticket, index) => <Ticket key={index} data={ticket} />) }
    </Grid>
  )
}

export default Home
