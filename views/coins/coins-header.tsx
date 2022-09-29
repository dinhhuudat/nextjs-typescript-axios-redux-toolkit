import { coinDetails } from "@/state/type/coinType";
import { formatMoney } from "@/utils/constants";
import { Avatar, Button, Grid, IconButton, Typography } from "@mui/material";
import { useMemo } from "react";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { CoinSymbol } from "../common/coin-icon-symbol";

interface Iprops {
  data: coinDetails;
}

export const CoinsHeader: React.FC<Iprops> = ({ data }) => {
  const price = useMemo(() => formatMoney(data.price as number), [data]);

  return (
    <>
      <Grid
        container
        gap={2}
        alignItems={{ sm: "center", xs: "flex-start" }}
        // alignContent={"space-between"}
        sx={{ width: "100%", pt: 2, pb: 2 }}
        direction={{ sm: "row", xs: "column" }}
      >
        <Grid item>
          <Grid container flexWrap="nowrap" alignItems="center" gap={1}>
            <CoinSymbol
              name={data.name}
              iconUrl={data.iconUrl}
              symbol={data.symbol}
              showRank
              rank={data.rank}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Typography align="center">{price}</Typography>
        </Grid>
      </Grid>
    </>
  );
};
