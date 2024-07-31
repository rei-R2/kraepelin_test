import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useUser(
  setPositionTest: Dispatch<SetStateAction<number>>,
  isStart: boolean,
  timer: number,
  positionTest: number,
  test: number[][],
) {
  const [input, setInput] = useState<number | null>(null);
  const [recordInputUser, setRecordInputUser] = useState<number[]>([]);
  const [inputPerSession, setInputPerSession] = useState<number[][]>([]);

  const [isBreakRecord, setIsBreakRecord] = useState<boolean>(false);
  const [dataChart, setDataChart] = useState<number[]>([]);
  const [result, setResult] = useState<boolean[]>([]);

  const [lableTimeDataChart, setLableTimeDataChart] = useState<string[]>([
    "5s",
    "10s",
    "15s",
    "20s",
    "25s",
    "30s",
    "35s",
    "40s",
    "45s",
    "50s",
    "55s",
    "60s",
  ]);

  useEffect(() => {
    // reset
    if (isStart) {
      setInput(null);
      setRecordInputUser([]);
      setInputPerSession([]);
      setDataChart([]);
      setResult([]);
    }
  }, [isStart]);

  useEffect(() => {
    // input user
    if (input !== null) {
      setPositionTest((state) => state + 1);
      setRecordInputUser((state) => [input, ...state]);
      setInput(null);
    }
  }, [input, setPositionTest]);

  useEffect(() => {
    // set break record
    if (isStart) {
      const idInterval = setInterval(
        () => {
          setIsBreakRecord(true);
        },
        ((timer * 60) / 12) * 1000,
      );

      return () => clearInterval(idInterval);
    }
  }, [isStart, timer]);

  useEffect(() => {
    // set input user per session
    if (isBreakRecord) {
      setInputPerSession((state) => [...state, recordInputUser]);
      setIsBreakRecord(false);
    }
  }, [isBreakRecord, recordInputUser]);

  useEffect(() => {
    // set data chart
    if (!isStart && inputPerSession.length === 12) {
      for (let i = 0; i < 12; i++) {
        const prevTotalInputPerSession =
          i > 0 ? inputPerSession[i - 1].length : 0;
        const totalInputPerSession = inputPerSession[i].length;
        setDataChart((state) => [
          ...state,
          totalInputPerSession - prevTotalInputPerSession,
        ]);
      }

      const result: string[] = [];
      const multipleTimePerSession = (timer * 60) / 12;
      for (let i = 1; i <= 12; i++) {
        result.push(`${multipleTimePerSession * i}s`);
      }
      setLableTimeDataChart(result);
    }
  }, [inputPerSession, isStart, timer]);

  useEffect(() => {
    if (positionTest !== 0 && test[positionTest]) {
      const answerTest = test[positionTest][2];
      const checkAnswer =
        recordInputUser[0] === (answerTest > 9 ? answerTest - 10 : answerTest);
      setResult((state) => [checkAnswer, ...state]);
    }
  }, [positionTest, recordInputUser, test]);

  return {
    input,
    setInput,
    recordInputUser,
    dataChart,
    result,
    lableTimeDataChart,
  };
}
