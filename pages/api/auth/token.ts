import type {NextApiRequest, NextApiResponse} from "next";
import {zendeskAuth} from "utils/api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let client = null

  try {
    const clients = await zendeskAuth.get("/clients")
    const clientIdentifier = clients.data.clients.filter((client: any) => client.identifier === String(process.env.CLIENT_ID))

    if (clientIdentifier && clientIdentifier.length > 0) {
      client = clientIdentifier[0]
    }

  } catch (e) {
    return res.status(500).send({
      type: "ERROR|CLIENTS",
      message: "Error querying clients",
      data: {}
    })
  }

  try {
    if (client !== null) {
      const token = await zendeskAuth.post("/tokens", {
        token: {
          client_id: client.id,
          scopes: ["read", "write"]
        }
      })

      if (token) {
        return res.status(200).send({
          type: "SUCCESS",
          message: "OK",
          data: token.data.token.full_token
        })
      } else {
        return res.status(500).send({
          type: "ERROR|TOKEN",
          message: "Error querying token for client",
          data: {}
        })
      }
    } else {
      return res.status(500).send({
        type: "ERROR|CLIENT",
        message: "Unable to find client",
        data: {}
      })
    }
  } catch (e) {
    return res.status(500).send({
      type: "ERROR|TOKEN",
      message: "Error querying token for client",
      data: {}
    })
  }
}