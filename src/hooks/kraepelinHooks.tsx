import { useState, useEffect, useRef, MutableRefObject } from "react";
import { generateKarepelinTest } from "../utils/generateTestKraepelinHooks";

let heightItemTest: number;
// let listNumber: number[];
export const useKraepelin = () => {
  const [listNumber, setListNumber] = useState<number[]>([]);
  const [listTest, setListTest] = useState<number[][]>();
  const [heightPerItemTest, setHeightPerItemTest] = useState<number>(0);
  const [currentIndexTest, setCurrentIndexTest] = useState<number>(0);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [inputUser, setInputUser] = useState<string>("");
  const [recordInputUser, setRecordInputUser] = useState<string[]>([]);
  const [result, setResult] = useState<string[]>([]);
  const [timer, setTimer] = useState<number>(1);
  const [time, setTime] = useState<string>("");
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
  const [dataChart, setDataChart] = useState<number[]>([]);
  const [dataChartPerInterval, setDataChartPerInterval] = useState<number[]>(
    [],
  );
  const [isBreak, setIsBreak] = useState<boolean>(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const listTestRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  const inputUserRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  console.log(listNumber);
  // generate test
  useEffect(() => {
    const { numbers, mapTest } = generateKarepelinTest();
    setListNumber(numbers);
    setListTest(mapTest);
  }, []);
  useEffect(() => {
    currentIndexTest;
  }, [currentIndexTest]);
  useEffect(() => {
    if (listNumber.length) {
      if (currentIndexTest > listNumber.length - 3) {
        const { numbers, mapTest } = generateKarepelinTest();
        console.log([...listNumber, ...numbers]);
        setListNumber([...listNumber, ...numbers]);
        listNumber.push(...numbers);
      }
    }
  }, [currentIndexTest, listNumber]);

  // set when user input answer
  useEffect(() => {
    if (isStart) {
      // focus element
      inputUserRef.current?.focus();
      // reset
      setResult([]);
      setRecordInputUser([]);
      setInputUser("");
      // set position test
      heightItemTest = listTestRef.current!.offsetHeight / listNumber.length;
      setHeightPerItemTest(
        listTestRef.current!.offsetHeight / listNumber.length,
      );
      // init currentIndexTest, isBreak, dataChart
      setCurrentIndexTest(0);
      setIsBreak(false);
      setDataChartPerInterval([]);
      setDataChart([]);
    }
  }, [isStart, listNumber.length]);

  // set scroll test
  useEffect(() => {
    heightItemTest = listTestRef.current!.offsetHeight / listNumber.length;
    setHeightPerItemTest(listTestRef.current!.offsetHeight / listNumber.length);
  }, [listNumber.length]);

  // check user answer
  useEffect(() => {
    if (inputUser.length > 0) {
      const answerTest = listTest![currentIndexTest][2];
      const checkAnswer =
        answerTest > 9 ? `${answerTest - 10}` : `${answerTest}`;

      if (checkAnswer === inputUser) {
        setCurrentIndexTest(currentIndexTest + 1);
        setRecordInputUser([inputUser, ...recordInputUser]);
        setInputUser("");
        setResult(["true", ...result]);
        setHeightPerItemTest((height) => (height -= heightItemTest));
      } else {
        setCurrentIndexTest(currentIndexTest + 1);
        setRecordInputUser([inputUser, ...recordInputUser]);
        setInputUser("");
        setResult(["false", ...result]);
        setHeightPerItemTest((height) => (height -= heightItemTest));
      }
    }
  }, [currentIndexTest, inputUser, listTest, recordInputUser, result]);

  // set time test when start
  useEffect(() => {
    if (isStart) {
      setTime(
        new Date(
          new Date().setMinutes(new Date().getMinutes() + timer),
        ).toISOString(),
      );

      const result: string[] = [];
      const multipleTimePerSession = (timer * 60) / 12;
      for (let i = 1; i <= 12; i++) {
        result.push(`${multipleTimePerSession * i}s`);
      }
      setLableTimeDataChart(result);
    }
  }, [isStart, timer]);

  // closed test
  useEffect(() => {
    if (isStart) {
      const idTimeOut = setTimeout(
        () => {
          setIsStart(false);
        },
        1000 * timer * 60,
      );

      return () => clearTimeout(idTimeOut);
    }
  }, [isStart, timer]);

  // data chart
  useEffect(() => {
    if (isStart) {
      const idInterval = setInterval(
        () => {
          setIsBreak(true);
        },
        ((timer * 60) / 12) * 1000,
      );

      return () => clearInterval(idInterval);
    }
  }, [isStart, timer]);
  useEffect(() => {
    if (isBreak) {
      setDataChartPerInterval((state) => [...state, result.length - 1]);
      setIsBreak(false);
    }
  }, [isBreak, result.length]);
  useEffect(() => {
    if (!isStart && dataChartPerInterval.length > 0 && !isBreak) {
      for (let i = 0; i < dataChartPerInterval.length; i++) {
        if (i === 0) {
          setDataChart((state) => [...state, dataChartPerInterval[i]]);
        } else {
          setDataChart((state) => [
            ...state,
            dataChartPerInterval[i] - dataChartPerInterval[i - 1],
          ]);
        }
      }
    }
  }, [dataChartPerInterval, isBreak, isStart]);

  useEffect(() => {
    dataChart.length > 0 && setIsOpenDrawer(true);
  }, [dataChart.length]);

  return {
    listNumber,
    listTestRef,
    heightPerItemTest,
    isStart,
    inputUserRef,
    setIsStart,
    inputUser,
    setInputUser,
    result,
    recordInputUser,
    timer,
    setTimer,
    time,
    dataChart,
    lableTimeDataChart,
    setIsOpenDrawer,
    isOpenDrawer,
  };
};
