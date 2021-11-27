import React, {FC} from "react";
import {Grid, styled, Typography} from "@mui/material";
import {Generic} from "./Common";
import {BoldHeader, BoldText, RegularHeader, RegularText, SemiBoldHeader, SemiBoldText} from "components/base";

interface StatsProps {
  stats: number
  description: string
  id?: string
}

const Container = styled(Grid)({
  padding: "20px 35px",
  backgroundColor: "white",
  borderRadius: 10,
  height: 180
})

const StatsDetail = styled(BoldHeader)({
  fontSize: 36
})

const Description = styled(SemiBoldHeader)({
  color: "#d0d6db",
  fontSize: 15
})

const Stats: FC<StatsProps> = ({ stats, description, id }) => {
  return (
    <Container container flexDirection="column" alignItems="center" justifyContent="center" className="stats-card">
      <Grid item>
        <StatsDetail variant="h2" className="stats-count" id={id}>
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