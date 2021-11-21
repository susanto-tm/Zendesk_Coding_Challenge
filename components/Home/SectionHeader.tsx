import React, {FC} from "react";
import {Grid} from "@mui/material";
import {BaseHeader} from "./Common";

interface SectionHeaderProps {
  text: string,
  sx?: any
}

const SectionHeader: FC<SectionHeaderProps> = ({ text, sx }) => {
  return (
    <Grid item sx={sx}>
      <BaseHeader>
        { text }
      </BaseHeader>
    </Grid>
  )
}

export default SectionHeader