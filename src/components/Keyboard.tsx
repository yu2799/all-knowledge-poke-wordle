import { FC, memo, MouseEvent, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { KEY_ALIGN_NOMAL, KEY_ALIGN_SPECIAL } from "../const/KeyAlign";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LoopIcon from "@mui/icons-material/Loop";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";

type Props = {
  onClickInput: (event: MouseEvent<HTMLButtonElement>) => void;
  onClickAnswer: (event: MouseEvent<HTMLButtonElement>) => void;
  onClickDelete: (event: MouseEvent<HTMLButtonElement>) => void;
  onClickDeleteAll: (event: MouseEvent<HTMLButtonElement>) => void;
  capState: { [key: string]: string };
};

export const Keyboard: FC<Props> = memo(
  ({
    onClickInput,
    onClickAnswer,
    onClickDelete,
    onClickDeleteAll,
    capState,
  }): JSX.Element => {
    const [isUpper, setIsUpper] = useState<boolean>(true);

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack spacing={1}>
          {(isUpper ? KEY_ALIGN_NOMAL : KEY_ALIGN_SPECIAL).map((align, i) => (
            <Stack key={JSON.stringify(align)} direction="row" spacing={1 / 2}>
              {align.map((chr, j) => (
                <Button
                  key={i * 10 + j}
                  onClick={onClickInput}
                  value={chr}
                  disabled={chr === ""}
                  variant={chr === "" ? "text" : "outlined"}
                  color="inherit"
                  sx={{
                    width: "40px",
                    minWidth: "40px",
                    backgroundColor:
                      chr !== ""
                        ? capState[chr] === "#ffffff"
                          ? "whitesmoke"
                          : capState[chr]
                        : "inherit",
                    color: "black",
                  }}
                >
                  {chr}
                </Button>
              ))}
            </Stack>
          ))}
        </Stack>

        <Box sx={{ p: 2 }} />
        <Stack spacing={1}>
          <Button color="success" variant="contained" onClick={onClickAnswer}>
            ANSWER
          </Button>
          <Button color="error" variant="outlined" onClick={onClickDelete}>
            DEL
          </Button>
          <Button color="error" variant="outlined" onClick={onClickDeleteAll}>
            ALL DEL
          </Button>
          <Button
            variant="outlined"
            onClick={() => setIsUpper((prev) => !prev)}
          >
            {`${isUpper ? "小" : "大"}文字`}
            <LoopIcon fontSize="small" />
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => setIsUpper((prev) => !prev)}
          >
            HINT
            <LightbulbIcon fontSize="small" />
          </Button>
          {/* <IconButton sx={{ color: "darkred" }} onClick={onClickDelete}>
              <BackspaceOutlinedIcon />
            </IconButton> */}
        </Stack>
      </Box>
    );
  }
);
