import {Box, Grid, styled, Typography} from "@mui/material";

export const Container = styled(Grid)({
  padding: "5px 20px"
})

export const BaseTypography = styled(Typography)({
  fontSize: 14,
  fontWeight: 500,
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

export const BaseHeader = styled(Typography)({
  fontSize: 32,
  fontWeight: 800,
  color: "black"
})