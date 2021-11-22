import type {NextApiRequest, NextApiResponse} from "next";
import {zendeskApi} from "utils/api/axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query: { id } } = req

  if (method === "GET" && req.headers.authorization) {
    try {
      const ticket = await zendeskApi(req.headers.authorization).get(`/tickets/${id}`)
      const ticketComments = await zendeskApi(req.headers.authorization).get(`/tickets/${id}/comments`)

      const ticketDetails = ticket.data.ticket
      ticketDetails.comments = ticketComments.data.comments

      return res.status(200).send({
        type: "SUCCESS",
        message: "OK",
        data: ticketDetails
      })

    } catch (e) {
      return res.status(500).send({
        type: "ERROR|AUTH",
        message: "Unauthorized",
        data: {}
      })
    }
  } else {
    return res.status(400).send({
      type: "ERROR",
      message: "Bad Request",
      data: {}
    })
  }
}