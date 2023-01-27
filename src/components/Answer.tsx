import { FC, memo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

type Props = {
  res: string[][][];
};

export const Answer: FC<Props> = memo(({ res }): JSX.Element => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 3,
      }}
    >
      <Stack spacing={1}>
        {res.map((str, i) => (
          <Stack key={i} direction="row" spacing={3 / 4}>
            {str.map(([chr, color], j) => (
              <Box
                key={j}
                sx={{
                  width: "2.5em",
                  height: "2.5em",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  background: color,
                  border: "solid 1.5px lightgray",
                  borderRadius: "10px",
                }}
              >
                {chr[0]}
              </Box>
            ))}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
});
