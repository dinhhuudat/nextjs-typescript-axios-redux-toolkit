import useDebounce from "@/hooks/useDebounce";
import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const StyledHeaderLink = styled(Typography)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));
export default function SearchAppBar() {
  const router = useRouter();
  const [searchParams, setSearchParams] = React.useState<string>("");
  const changedSearchParams = useDebounce<any>(searchParams, 500);
  const handleSearch = async (values: any) => {
    const searchString = values.target.value;
    setSearchParams(searchString);
  };

  React.useEffect(() => {
    router.push(`/coins?search=${searchParams}`);
  }, [changedSearchParams]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Link href="/coins">
            <StyledHeaderLink
              variant="h6"
              noWrap
              sx={{ flexGrow: 1, mr: 2, display: { xs: "block", sm: "block" } }}
            >
              COINS RANKING
            </StyledHeaderLink>
          </Link>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearch}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
