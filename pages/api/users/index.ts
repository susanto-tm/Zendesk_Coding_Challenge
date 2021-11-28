import type {NextApiRequest, NextApiResponse} from "next";
import {zendeskApi} from "utils/api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers: { authorization }, method, query: { ids } } = req

  if (method === "GET" && authorization && typeof ids === "string") {
    let users = null

    try {
      const selectedUsers = await zendeskApi(authorization).get(`/users/show_many`, {
        params: {
          ids
        }
      })

      if (selectedUsers && selectedUsers.data) {
        users = selectedUsers.data.users
      }

    } catch (e) {
      console.error(e)
      return res.status(500).send({
        type: "ERROR|AUTH",
        message: "Unauthorized",
        data: {}
      })
    }

    if (users !== null) {
      const data = users.map((user: any) => {
        const {
          name,
          email,
          created_at,
          photo,
          id
        } = user
        return { id, name, email, created_at, photo: photo ? photo.content_url : null }
      })

      return res.status(200).send({
        type: "SUCCESS",
        message: "OK",
        data
      })
    } else {
      return res.status(500).send({
        type: "ERROR|USERS",
        message: "Error querying user ids",
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