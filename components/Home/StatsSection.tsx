import React, {FC} from "react";
import {Grid} from "@mui/material";
import Stats from "./Stats";

interface StatsSectionProps {
  allCount: number
  openCount: number
  pendingCount: number
  closedCount: number
}

const StatsSection: FC<StatsSectionProps> = ({ allCount, openCount, pendingCount, closedCount }) => {
  return (
    <Grid item container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={3}>
        <Stats stats={allCount} description="Total number of tickets" />
      </Grid>
      <Grid item xs={3}>
        <Stats stats={openCount} description="Total number of open tickets" />
      </Grid>
      <Grid item xs={3}>
        <Stats stats={pendingCount} description="Total number of pending tickets" />
      </Grid>
      <Grid item xs={3}>
        <Stats stats={closedCount} description="Total number of closed tickets" />
      </Grid>
    </Grid>
  )
}

export default StatsSection