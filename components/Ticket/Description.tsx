import {FC} from "react";
import {Ticket} from "types/Ticket";
import {Box, Grid, styled} from "@mui/material";
import {BoldHeader, RegularText, SemiBoldText} from "components/base";
import {ContentDivider, ContentHeader} from "components/Ticket/Common";

const DescriptionText = styled(SemiBoldText)({
  fontSize: 16,
  color: "#101010"
})

const Description: FC<Pick<Ticket, "description">> = ({ description }) => {
  return (
    <Grid item container flexDirection="column" sx={{ mt: 1.2 }}>
      <Grid item sx={{ position: "relative" }}>
        <ContentHeader>
          Description
        </ContentHeader>
        <ContentDivider />
      </Grid>
      <DescriptionText sx={{ mt: 1 }}>
        { description }
      </DescriptionText>
    </Grid>
  )
}

export default Description