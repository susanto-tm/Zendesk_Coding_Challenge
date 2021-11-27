import React, {FC} from "react";
import {Grid} from "@mui/material";
import {BaseHeader} from "./Common";

interface SectionHeaderProps {
  text: string,
  sx?: any
  id?: string
}

const SectionHeader: FC<SectionHeaderProps> = ({ text, sx, id }) => {
  return (
    <Grid item sx={sx}>
      <BaseHeader variant="h1" id={id}>
        { text }
      </BaseHeader>
    </Grid>
  )
}

export default SectionHeader