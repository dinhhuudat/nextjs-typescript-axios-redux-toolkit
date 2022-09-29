import { coinItem, coinLists } from "@/state/type/coinType";
import { Grid, TableSortLabel } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { StyledTableCell } from "../common/styledComponent";
import { CoinsItem } from "./coins-items";

interface Iprops {
  listData: coinLists;
}

const CoinsTable: React.FC<Iprops> = ({ listData }) => {
  const router = useRouter();

  const { orderDirection, orderBy } = router.query;

  const [priceSort, setpriceSort] = useState<"asc" | "desc">("desc");
  const [priceChangeSort, setpriceChangeSort] = useState<"asc" | "desc">(
    "desc"
  );
  const [capSort, setcapSort] = useState<"asc" | "desc">("desc");

  const handleSort = (values: { orderBy: string; orderDirection: string }) => {
    router.query.orderBy = values.orderBy;
    router.query.orderDirection = values.orderDirection;
    router.push({ query: router.query });
  };

  useEffect(() => {
    if (orderDirection && orderBy) {
      if (orderBy === "marketCap") {
        (orderDirection === "asc" || orderDirection === "desc") &&
          setcapSort(orderDirection);
      } else if (orderBy === "change") {
        (orderDirection === "asc" || orderDirection === "desc") &&
          setpriceChangeSort(orderDirection);
      } else if (orderBy === "price") {
        (orderDirection === "asc" || orderDirection === "desc") &&
          setpriceSort(orderDirection);
      }
    }
  }, [orderDirection, orderBy]);

  return (
    <>
      <Grid sx={{ width: "100%" }}>
        <TableContainer component={Paper} sx={{ height: "70vh" }}>
          <Table
            stickyHeader
            sx={{ width: "100%" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Rank</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">
                  BTC Price
                  <TableSortLabel
                    active
                    direction={priceSort}
                    onClick={() =>
                      handleSort({
                        orderBy: "price",
                        orderDirection: priceSort === "asc" ? "desc" : "asc",
                      })
                    }
                  />
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  sx={{ display: { sm: "table-cell", xs: "none" } }}
                >
                  Price Change{" "}
                  <TableSortLabel
                    active
                    direction={priceChangeSort}
                    onClick={() =>
                      handleSort({
                        orderBy: "change",
                        orderDirection:
                          priceChangeSort === "asc" ? "desc" : "asc",
                      })
                    }
                  />
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ display: { sm: "table-cell", xs: "none" } }}
                >
                  Current total market cap
                  <TableSortLabel
                    active
                    direction={capSort}
                    onClick={() =>
                      handleSort({
                        orderBy: "marketCap",
                        orderDirection: capSort === "asc" ? "desc" : "asc",
                      })
                    }
                  />
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(listData) &&
                listData.map((data: coinItem) => <CoinsItem data={data} />)}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default CoinsTable;
