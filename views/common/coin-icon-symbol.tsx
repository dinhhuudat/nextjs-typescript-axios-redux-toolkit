import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { Avatar, Grid, IconButton, Typography } from "@mui/material";

interface Iprops {
  name: string;
  iconUrl: string;
  symbol: string;
  showRank?: boolean;
  rank?: number;
}

export const CoinSymbol: React.FC<Iprops> = ({
  name,
  iconUrl,
  symbol,
  showRank = false,
  rank,
}) => {
  return (
    <>
      <Grid container flexWrap="nowrap" alignItems="center" gap={1}>
        <Avatar
          src={iconUrl}
          sx={{ width: { xs: 14, sm: 24 }, height: { xs: 14, sm: 24 } }}
        />
        <Typography variant="h6"  sx={{ fontSize: { xs: 14, sm: 24 } }}>{name}</Typography>
        <Typography color="gray" sx={{ fontSize: { xs: 12, sm: 20 } }}>{symbol}</Typography>
        {showRank && (
          <IconButton disabled>
            <MilitaryTechIcon />
            {rank}
          </IconButton>
        )}
      </Grid>
    </>
  );
};
