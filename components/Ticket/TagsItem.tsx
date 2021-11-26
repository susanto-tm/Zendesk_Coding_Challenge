import React, {FC} from "react";
import {Grid, styled} from "@mui/material";
import Tag from "components/Home/Tag";
import {ItemContainer, ItemHeader} from "components/Ticket/Common";

interface TagsItemProps {
  tags: Array<string>
}

const TagsItemContainer = styled(ItemContainer)({
  padding: "0 !important"
})

const TagsItem: FC<TagsItemProps> = ({ tags }) => {
  return (
    <Grid item>
      <ItemHeader>Tags</ItemHeader>
      <ItemContainer item container flexWrap="wrap" gap={2} sx={{ mt: 0.5 }}>
        { tags && tags.map((tag, index) => <Grid item key={index}><Tag text={tag}/></Grid>) }
      </ItemContainer>
    </Grid>
  )
}

export default TagsItem