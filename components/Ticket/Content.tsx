import React, {FC} from "react";
import {Grid, styled} from "@mui/material";
import TopHeader from "components/Ticket/TopHeader";
import {ContentProps} from "types/Ticket";
import Description from "components/Ticket/Description";
import Comments from "components/Ticket/Comments";

const ContentContainer = styled(Grid)({
  padding: "60px 100px"
})

const Content: FC<ContentProps> = ({ ticket }) => {
  const { status, subject, priority, created_at, description, comments } = ticket

  return (
    <ContentContainer container flexDirection="column">
      <TopHeader status={status} subject={subject} priority={priority} created_at={created_at} />
      <Description description={description} />
      <Comments comments={comments} />
    </ContentContainer>
  )
}
 export default Content