import {Grid, styled, Typography} from "@mui/material";

export const Main = styled(Grid)({
  width: "100%",
  backgroundColor: "#F7F8FA",
  padding: "30px 50px",
  minHeight: "100vh"
})

export const Header = styled(Typography)({
  fontFamily: "'Poppins', sans-serif"
})

export const Text = styled(Typography)({
  fontFamily: "'Montserrat', sans-serif"
})

export const RegularHeader = styled(Header)({
  fontWeight: "normal"
})

export const RegularText = styled(Text)({
  fontWeight: "normal"
})

export const SemiBoldHeader = styled(Header)({
  fontWeight: 600
})

export const SemiBoldText = styled(Text)({
  fontWeight: 600
})

export const BoldHeader = styled(Header)({
  fontWeight: 700
})

export const BoldText = styled(Text)({
  fontWeight: 700
})

export const ExtraBoldHeader = styled(Header)({
  fontWeight: 800
})

export const ExtraBoldText = styled(Text)({
  fontWeight: 800
})
