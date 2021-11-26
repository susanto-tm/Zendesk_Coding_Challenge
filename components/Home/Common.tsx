import {Box, Grid, styled, Typography} from "@mui/material";
import {BoldHeader, RegularText} from "components/base";

export const Container = styled(Grid)({
  padding: "5px 20px"
})

export const BaseTypography = styled(RegularText)({
  fontSize: 14,
})

export const Generic = styled(BaseTypography)({
  color: "black",
  fontSize: 16
})

export const StatusIcon = styled(Box)({
  height: "10px",
  width: "10px",
  borderRadius: "100%",
})

export const BaseHeader = styled(BoldHeader)({
  fontSize: 32,
  color: "black"
})