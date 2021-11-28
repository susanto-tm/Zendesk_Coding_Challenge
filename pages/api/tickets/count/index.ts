import type {NextApiRequest, NextApiResponse} from "next";
import {zendeskApi} from "utils/api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query: { status } } = req

  if (method === 'GET' && req.headers.authorization) {
    try {
      if (status) {
        const count = await zendeskApi(req.headers.authorization).get("/search", {
          params: {
            query: `type:ticket status:${status}`
          }
        })

        return res.status(200).send({
          type: "SUCCESS",
          message: "OK",
          data: count.data.count
        })
      } else {
        const all = await zendeskApi(req.headers.authorization).get("/tickets")

        return res.status(200).send({
          type: "SUCCESS",
          message: "OK",
          data: all.data.count
        })

      }
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