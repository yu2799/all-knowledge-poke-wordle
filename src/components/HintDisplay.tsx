import Box from "@mui/material/Box";
import { FC } from "react";

type Props = {
  data: string[];
};

export const HintDisplay: FC<Props> = ({ data }): JSX.Element => {
  return (
    <Box
      sx={{
        py: 3,
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
        }}
      >
        Hint
      </Box>
      {data.length ? (
        data.map((str, idx) => (
          <Box
            key={idx}
            flexGrow="1"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "20px",
            }}
          >
            {str}
          </Box>
        ))
      ) : (
        <Box
          flexGrow="1"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "20px",
          }}
        >
          なし
        </Box>
      )}
    </Box>
  );
};
