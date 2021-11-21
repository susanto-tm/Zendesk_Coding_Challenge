import React, { FC } from 'react'
import {Grid, styled} from "@mui/material";
import {Container, Generic} from "./Common";

const LegendText = styled(Generic)({
  color: "#C2CBD2"
})

const Legend: FC = () => {
  return (
    <Container container alignItems="center" columns={16}>
      <Grid item xs={1}>
        <LegendText>
          ID
        </LegendText>
      </Grid>
      <Grid item xs={5}>
        <LegendText>
          Subject
        </LegendText>
      </Grid>
      <Grid item xs={2}>
        <LegendText>
          Status
        </LegendText>
      </Grid>
      <Grid item xs={2}>
        <LegendText>
          Priority
        </LegendText>
      </Grid>
      <Grid item xs={2}>
        <LegendText>
          Date Created
        </LegendText>
      </Grid>
      <Grid item xs={4}>
        <LegendText>
          Tags
        </LegendText>
      </Grid>
    </Container>
  )
}

export default Legend