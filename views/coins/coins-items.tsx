import { coinItem } from "@/state/type/coinType";
import { formatMoney } from "@/utils/constants";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Typography } from "@mui/material";
import Link from "next/link";
import { useMemo } from "react";
import { CoinSymbol } from "../common/coin-icon-symbol";
import {
  StyledGrid,
  StyledTableCell,
  StyledTableRow
} from "../common/styledComponent";

interface Iprops {
  data: coinItem;
}

export const CoinsItem: React.FC<Iprops> = ({ data }) => {
  const cap = useMemo(() => formatMoney(data.marketCap as number), [data]);

  return (
    <>
      <StyledTableRow key={data.rank}>
        <StyledTableCell align="center">{data.rank}</StyledTableCell>
        <StyledTableCell align="left">
          <Link href={`/coins/${data.uuid}`}>
            <StyledGrid container alignItems={"center"}>
              <CoinSymbol
                name={data.name}
                iconUrl={data.iconUrl}
                symbol={data.symbol}
              />
              <Typography
                color={data.color}
                alignItems="cetner"
                sx={{ display: { sm: "none" } }}
              >
                <TrendingUpIcon
                  sx={{
                    width: { xs: 12 },
                    height: { xs: 12 },
                    mr: 1,
                  }}
                />
                {data.change}
              </Typography>
            </StyledGrid>
          </Link>
        </StyledTableCell>
        <StyledTableCell align="left">
          {`${data.btcPrice} / BTC`}
        </StyledTableCell>
        <StyledTableCell align="right">
          <Typography
            sx={{ display: { sm: "table-cell", xs: "none" } }}
            color={data.color}
          >
            {data.change} %
          </Typography>
        </StyledTableCell>
        <StyledTableCell
          sx={{ display: { sm: "table-cell", xs: "none" } }}
          align="center"
        >
          {cap}
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};
