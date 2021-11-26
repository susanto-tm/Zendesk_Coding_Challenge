import {Box, Grid, styled} from "@mui/material";
import {BoldHeader, SemiBoldHeader} from "components/base";

export const ItemContainer = styled(Grid)({
  borderRadius: 12,
  backgroundColor: "white",
  border: "3px #E5EAEE solid",
  padding: "10px 20px",
  width: "100%"
})

export const ItemHeader = styled(SemiBoldHeader)({
  fontSize: 18
})

export const ContentHeader = styled(BoldHeader)({
  fontSize: 20,
  color: "#E34F32",
  width: "fit-content"
})
export const ContentDivider = styled(Box)({
  backgroundColor: "#E34F32",
  height: "2px",
  width: "15%",
  position: "absolute",
  bottom: 0,
  left: 0
})