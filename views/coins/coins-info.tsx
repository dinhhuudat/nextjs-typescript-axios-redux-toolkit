import { coinDetails } from "@/state/type/coinType";
import { Typography } from "@mui/material";

interface Iprops {
  data: coinDetails;
}

export const CoinsInfo: React.FC<Iprops> = ({ data }) => {
  return (
    <>
      <Typography
        sx={{ mt: 2, mb: 2 }}
        variant="h3"
      >{`About: ${data.name}`}</Typography>
      <div dangerouslySetInnerHTML={{ __html: data.description }} />
    </>
  );
};
