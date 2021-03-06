import type {NextApiRequest, NextApiResponse} from "next";
import {zendeskApi} from "utils/api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { page: queryPage, limit: queryLimit } = req.query
  let page = queryPage ?? 1,
      limit = queryLimit ?? 25

  if (req.headers.authorization) {
    try {
      const tickets = await zendeskApi(req.headers.authorization).get("/tickets", {
        params: {
          page,
          per_page: limit
        }
      })

      if (tickets && tickets.data) {
        return res.status(200).send({
          type: "SUCCESS",
          message: "OK",
          data: tickets.data.tickets
        })
      }

    } catch (e) {
      console.error(e)
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