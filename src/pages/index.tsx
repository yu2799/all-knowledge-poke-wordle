import type { NextPage, GetStaticProps } from "next";
import { useState, MouseEvent, useEffect, forwardRef } from "react";
import { Answer } from "../components/Answer";
import { Header } from "../components/Header";
import { Keyboard } from "../components/Keyboard";
import { KEY_ALIGN_NOMAL, KEY_ALIGN_SPECIAL } from "../const/KeyAlign";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Image from "next/image";
import { Grid, Typography } from "@mui/material";
import DATA from "../../public/pokemon.json";
import { HintDisplay } from "../components/HintDisplay";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const searchImg = async (name: string): Promise<string> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
  const res = await response.json();
  const sprites = res["sprites"];
  return sprites["front_shiny"] || sprites["front_default"];
};
const searchHint = async (name: string): Promise<string[]> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
  const res = await response.json();
  const text: string[] = ["", "", ""];
  const num: number = Math.floor(Math.random() * 3);
  // 最も高い種族値
  if (num === 0) {
    let hStat: string = "";
    let hVal = 0;
    for (const { base_stat, stat } of res["stats"]) {
      if (hVal < base_stat) {
        hStat = stat["name"];
        hVal = base_stat;
      }
    }
    const txtMap: { [key: string]: string } = {
      hp: "たいりょく",
      attack: "こうげき",
      defense: "ぼうぎょ",
      "special-attack": "とくこう",
      "special-defense": "とくぼう",
      speed: "すばやさ",
    };
    text[0] = "最も高い種族値は";
    text[1] = `${txtMap[hStat]} の ${hVal}`;
    text[2] = "です";
  } else {
    const typeMap: { [key: string]: string } = {
      normal: "ノーマル",
      fire: "ほのお",
      water: "みず",
      grass: "くさ",
      electric: "でんき",
      ice: "こおり",
      fighting: "かくとう",
      poison: "どく",
      ground: "じめん",
      flying: "ひこう",
      psychic: "エスパー",
      bug: "むし",
      rock: "いわ",
      ghost: "ゴースト",
      dragon: "ドラゴン",
      dark: "あく",
      steel: "はがね",
      fairy: "フェアリー",
    };
    text[0] = "このポケモンのタイプには";
    text[1] = `${typeMap[res["types"][0]["type"]["name"]]} タイプ`;
    text[2] = "が含まれています";
  }
  return text;
};

const MAX_LENGTH: number = 6;
const CORRECT: string = "#32cd32";
const NEAR_CORRECT: string = "#ffd700";
const INCORRECT: string = "#c0c0c0";
const NO_ANSWER: string = "#ffffff";

type Props = {
  data: string[][];
};

const Home: NextPage<Props> = ({ data }): JSX.Element => {
  const nameMap: { [key: string]: string } = Object.fromEntries(data);
  const [theme, setTheme] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [res, setRes] = useState<string[][][] | null>(null);
  const [capState, setCapState] = useState<{ [key: string]: string }>({});
  const [maxPlay, setMaxPlay] = useState<number>(6);
  const [open, setOpen] = useState<boolean>(false);
  const [pokeImg, setPokeImg] = useState<string>("");
  const [isAnimation, setAnimation] = useState<boolean>(false);
  const [hintCnt, setHintCnt] = useState<number>(1);
  const [hintData, setHintData] = useState<string[]>([]);

  const onClickAnswer = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!res || isAnimation) return;

    setAnimation(true);
    const tmp = [];
    for (let i = 0; i < MAX_LENGTH; ++i) tmp.push(res[step][i][0]);
    const buf = tmp.join("").trim();
    if (!nameMap[buf]) {
      alert("存在しません");
      setAnimation(false);
      return;
    }
    setStep((prev) => prev + 1);
    for (let i = 0; i < MAX_LENGTH; ++i) {
      const chr: string = buf[i];
      const tar: string =
        theme.indexOf(chr) === -1
          ? INCORRECT
          : chr === theme[i]
          ? CORRECT
          : NEAR_CORRECT;
      await new Promise((resolve) => setTimeout(resolve, 300)).then(() => {
        res[step][i][1] = tar;
        setRes([...res]);
        if (capState[chr] !== CORRECT)
          setCapState((prev) => ({ ...prev, [chr]: tar }));
      });
    }
    await new Promise((resolve) => setTimeout(resolve, 300)).then(() => {
      if (buf === theme) {
        searchImg(nameMap[buf].toLowerCase())
          .then(setPokeImg)
          .then(() => setOpen(true));
        init();
      }
      setAnimation(false);
    });
  };
  const onClickInput = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (!res || isAnimation) return;

    const chr: string = e.currentTarget.value;
    const idx: number = searchElement(res[step], "");
    if (idx !== -1) {
      res[step][idx][0] = chr;
      setRes(res.slice());
    }
  };
  const onClickDelete = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (!res || isAnimation) return;

    const idx: number = searchElement(res[step], "");
    if (idx !== 0) {
      res[step][idx === -1 ? MAX_LENGTH - 1 : idx - 1][0] = "";
      setRes(res.slice());
    }
  };
  const onClickDeleteAll = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (!res || isAnimation) return;

    const idx: number = searchElement(res[step], "");
    for (let i = 0; i < idx; ++i) res[step][i][0] = "";
    setRes(res.slice());
  };
  const onClickHint = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (!res || isAnimation) return;
    searchHint(nameMap[theme].toLowerCase()).then((res) => {
      setHintData(res);
      setHintCnt(0);
    });
  };

  const init = (): void => {
    const obj: { [key: string]: string } = {};
    for (const keys of KEY_ALIGN_NOMAL) {
      for (const key of keys) if (key !== "") obj[key] = NO_ANSWER;
    }
    for (const keys of KEY_ALIGN_SPECIAL) {
      for (const key of keys) if (key !== "") obj[key] = NO_ANSWER;
    }
    const theme: string =
      data[Math.floor(Math.random() * Object.keys(nameMap).length) + 1][0];
    console.log(theme);
    setTheme(theme);
    setStep(0);
    setRes(
      [...Array(maxPlay)].map((_) =>
        [...Array(MAX_LENGTH)].map((_) => ["", NO_ANSWER])
      )
    );
    setCapState(obj);
    setHintCnt(1);
    setHintData([]);
  };

  useEffect(init, []);

  useEffect(() => {
    if (step >= maxPlay && !isAnimation) {
      alert(`答えは${theme}でした。`);
      init();
    }
  }, [isAnimation]);

  return (
    <Box
      sx={{
        backgroundColor: "snow",
        pb: 4,
      }}
    >
      <Header />
      {theme && res && (
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={4} />
            <Grid item xs={4}>
              <Answer res={res} />
            </Grid>
            <Grid item xs={4}>
              <HintDisplay data={hintData} />
            </Grid>
          </Grid>
          <Keyboard
            onClickInput={onClickInput}
            onClickAnswer={onClickAnswer}
            onClickDelete={onClickDelete}
            onClickDeleteAll={onClickDeleteAll}
            onClickHint={onClickHint}
            capState={capState}
            hintCnt={hintCnt}
          />
        </Container>
      )}
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={8000}
      >
        <Alert
          severity="success"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography textAlign="center">{`+${10 - step}点`}</Typography>
          <Image
            src={pokeImg}
            alt="お題ポケモンの画像"
            width="100"
            height="100"
          />
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;

type Data = {
  [key: string]: {
    jaName: string;
    enName: string;
    gen: number;
    hp: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    speed: number;
    avi1: string;
    avi2: string | null;
    avi3: string | null;
    type1: string;
    type2: string | null;
  };
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  // const res = await fetch(`${process.env.SITE}/pokemon.json`);
  // const data: Data = await res.json();
  const data: Data = DATA;
  const nameSet: string[][] = Object.values(data).map(({ jaName, enName }) => [
    jaName,
    enName,
  ]);
  return {
    props: { data: nameSet },
  };
};

// 見つかればi, そうでなければ-1
const searchElement = (arr: string[][], tar: string): number => {
  for (let i = 0; i < MAX_LENGTH; ++i) if (arr[i][0] === tar) return i;
  return -1;
};
