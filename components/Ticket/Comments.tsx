import {FC} from "react";
import {Comment, Ticket} from "types/Ticket";
import {Avatar, Grid, styled} from "@mui/material";
import {ContentDivider, ContentHeader} from "components/Ticket/Common";
import {BoldHeader, SemiBoldHeader, SemiBoldText} from "components/base";
import moment from "moment";

const CommentContainer = styled(Grid)({
  padding: "35px 50px",
  borderBottom: "2px #d0d6db solid"
})

const CommentText = styled(SemiBoldText)({
  fontSize: 14,
  color: "#101010"
})

const Author = styled(BoldHeader)({
  color: "#101010",
  fontSize: 18
})

const CreatedAt = styled(SemiBoldHeader)({
  color: "#C2CBD2",
  fontSize: 18
})

const CommentHeader: FC<Pick<Comment, "author" | "created_at">> = ({ author, created_at }) => {
  return (
    <Grid item container alignItems="center" spacing={2}>
      <Grid item>
        <Author>
          { author.name }
        </Author>
      </Grid>
      <Grid item>
        <CreatedAt>
          { moment(created_at).format("MM/DD/YYYY") }
        </CreatedAt>
      </Grid>
    </Grid>
  )
}

const Comment: FC<{ comment: Comment }> = ({ comment }) => {
  const { author, created_at, body } = comment
  const { photo } = author

  const src = photo ?? "/user.png"

  return (
    <CommentContainer container alignItems="center">
      <Grid item xs={2}>
        <Avatar alt="Comment Author" src={src} sx={{ width: "60px", height: "60px" }} />
      </Grid>
      <Grid item xs={10} container flexDirection="column">
        <CommentHeader created_at={created_at} author={author} />
        <CommentText>
          { body }
        </CommentText>
      </Grid>
    </CommentContainer>
  )
}


const Comments: FC<Pick<Ticket, "comments">> = ({ comments }) => {
  return (
    <Grid item container flexDirection="column" sx={{ mt: 2 }}>
      <Grid item sx={{ position: "relative" }}>
        <ContentHeader>
          Comments
        </ContentHeader>
        <ContentDivider />
      </Grid>
      <Grid item>
        { comments && comments.map((comment: Comment, index) => <Comment comment={comment} key={index} />) }
      </Grid>
    </Grid>
  )
}

export default Comments