import React, {FC} from "react";
import {Grid, styled, Typography} from "@mui/material";
import {Generic} from "./Common";

interface StatsProps {
  stats: number
  description: string
}

const Container = styled(Grid)({
  padding: "20px 35px",
  backgroundColor: "white",
  borderRadius: 10,
  height: 180
})

const StatsDetail = styled(Generic)({
  fontSize: 32
})

const Description = styled(Generic)({
  color: "#d0d6db"
})

const Stats: FC<StatsProps> = ({ stats, description }) => {
  return (
    <Container container flexDirection="column" alignItems="center" justifyContent="center">
      <Grid item>
        <StatsDetail>
          { stats }
        </StatsDetail>
      </Grid>
      <Grid item>
        <Description>
          { description }
        </Description>
      </Grid>
    </Container>
  )
}

export default Stats