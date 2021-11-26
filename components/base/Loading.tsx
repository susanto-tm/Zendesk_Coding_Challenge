import React, {FC, useEffect} from "react";
import * as lottie from 'lottie-web'
import LoadingAnimation from 'assets/lottie/loading.json'
import {Grid} from "@mui/material";
import { BoldHeader } from 'components/base'

interface LoadingProps {
  loading: boolean
  text: string
}

const Loading: FC<LoadingProps> = ({ loading, text }) => {
  useEffect(() => {
    if (loading) {
      // @ts-ignore
      lottie.loadAnimation({
        container: document.querySelector("#loading-container"),
        renderer: "svg",
        autoplay: true,
        loop: true,
        animationData: LoadingAnimation
      })
    }
  }, [loading])

  return (
    <Grid container flexDirection="column" alignItems="center" justifyContent="center" sx={{ minHeight: "100vh" }}>
      <Grid item>
        <div id="loading-container" />
      </Grid>
      <Grid item>
        <BoldHeader sx={{ fontSize: 24 }}>
          { text }
        </BoldHeader>
      </Grid>
    </Grid>
  )
}

export default Loading