import React, {FC} from "react";
import {Box, styled} from "@mui/material";
import {Generic} from "./Common";

interface TagProps {
  text: string
}

const TagContainer = styled(Box)({
  backgroundColor: "#E5EAEE",
  padding: "5px 10px",
  width: "fit-content",
  borderRadius: 5,
  margin: 0
})

const TagText = styled(Generic)({
  color: "#C2CBD2"
})

const Tag: FC<TagProps> = ({ text }) => {
  return (
    <TagContainer>
      <TagText>
        { text }
      </TagText>
    </TagContainer>
  )
}

export default Tag