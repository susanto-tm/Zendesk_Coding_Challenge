import {User} from "types/ApiProvider";

export interface ContentProps {
  ticket: Ticket
}

export interface Ticket {
  status: "open" | "pending" | "solved"
  priority: string
  subject: string
  created_at: Date
  description: string
  comments: Array<Comment>
}

export interface Comment {
  id: string
  created_at: Date
  body: string
  author: User
}

export type TopHeaderProps = Pick<Ticket, "status" | "subject" | "created_at"> & Pick<Partial<Ticket>, "priority">