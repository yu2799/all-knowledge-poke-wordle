import { FC } from "react";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const InfoDialog: FC<Props> = ({ open, onClose }): JSX.Element => {
  return (
    <Dialog onClose={onClose} open={open} maxWidth="md">
      <DialogTitle>Pokemon wordle へ ようこそ !</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ポケモン版の単語当てゲーム「wordle」です。第8世代までの全ポケモンが登場します。
        </DialogContentText>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 2,
            ml: 8,
          }}
        >
          <Image src="/ex_fig.png" alt="説明画像" width="200" height="100" />
          <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/351.png"
            alt="ポワルン"
            width="100"
            height="100"
          />
        </Box>
        <DialogContentText sx={{ pt: 0.5 }}>
          灰色で塗られた箇所は何も合ってないことを教えてくれます。
        </DialogContentText>
        <DialogContentText sx={{ pt: 0.5 }}>
          黄色で塗られた箇所は位置は合ってないけど答えにその文字が含まれていることを教えてくれます。
        </DialogContentText>
        <DialogContentText sx={{ pt: 0.5 }}>
          緑色で塗られた箇所は位置も合っていて答えにその文字が含まれていることを教えてくれます。
        </DialogContentText>
        <DialogContentText sx={{ pt: 0.5 }}>
          白色で塗られた箇所は無回答です。
        </DialogContentText>
        <DialogContentText sx={{ pt: 2 }}>
          連続正答して点数を多く稼ごう！
        </DialogContentText>
        <DialogContentText sx={{ pt: 2 }}>
          このサイトは
          <a href="https://www.nytimes.com/games/wordle/index.html">
            Wordle - The New York Times
          </a>
          から着想を得ています。是非こちらもどうぞ。
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
