import type {NextPage} from "next";
import {useRouter} from "next/router";
import {useApi} from "../../components/context/ApiProvider";
import {useCallback, useEffect, useState} from "react";

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

  return (
    <></>
  )
}

export default TicketPage