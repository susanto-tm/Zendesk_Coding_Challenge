import type {NextApiRequest, NextApiResponse} from "next";
import {zendeskApi} from "utils/api";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query: { id }, headers: { authorization } } = req

  if (method === "GET" && authorization) {
    let ticket = null, comments = null

    try {
      const selectedTicket = await zendeskApi(authorization).get(`/tickets/${id}`)

      if (selectedTicket) {
        ticket = selectedTicket.data.ticket
      }
    }
    catch (e) {
      return res.status(500).send({
        type: "ERROR|TICKET",
        message: "Unauthorized or Bad Request",
        data: {}
      })
    }
    try {
      const ticketComments = await zendeskApi(authorization).get(`/tickets/${id}/comments`)

      if (ticketComments) {
        comments = ticketComments.data.comments.map((comment: any) => {
          const { id, type, body, created_at, author_id } = comment
          return {
            id,
            type,
            body,
            created_at,
            author_id
          }
        })
      }

    } catch (e) {
      return res.status(500).send({
        type: "ERROR|AUTH",
        message: "Unauthorized",
        data: {}
      })
    }

    try {
      if (ticket !== null && comments !== null) {
        const {
          requester_id,
          submitter_id,
          assignee_id,
          status,
          subject,
          created_at,
          description,
          priority,
          type,
          tags
        } = ticket

        const commentIds = comments.map((comment: any) => {
          return comment.author_id
        })

        const allIds: string[] = [requester_id, submitter_id, assignee_id, ...commentIds]
        const userIds = Array.from(new Set(allIds)).join(",")

        const selectedUsers = await axios.get("http://localhost:3000/api/users", {
          params: {
            ids: userIds
          },
          headers: {
            authorization
          }
        })

        const users: any = {}
        selectedUsers.data.data.forEach((user: any) => users[String(user.id)] = user)

        const resolvedComments = comments.map((comment: any) => {
          const { author_id, ...rest } = comment
          return {
            ...rest,
            author: users[author_id]
          }
        })

        const data = {
          status,
          created_at,
          priority,
          type,
          subject,
          description,
          requester: users[requester_id],
          submitter: users[submitter_id],
          assignee: users[assignee_id],
          tags,
          comments: resolvedComments
        }

        return res.status(200).send({
          type: "SUCCESS",
          message: "OK",
          data
        })
      } else {
        return res.status(500).send({
          type: "ERROR|TICKETID",
          message: "Error querying ticket",
          data: {}
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