import { useEffect, useState } from "react";
import { generateKarepelinTest } from "../utils/generateTestKraepelinHooks";

export const useKraepelin = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [test, setTest] = useState<number[][]>([]);
  const [positionTest, setPositionTest] = useState<number>(0);

  const [isStart, setIsStart] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(1);
  const [time, setTime] = useState<string>("");

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  useEffect(() => {
    // generate numbers
    if (isStart) {
      const { listNumber } = generateKarepelinTest();
      setNumbers(listNumber);
      setPositionTest(0);
    }
  }, [isStart]);

  useEffect(() => {
    // generate test
    if (numbers.length - 4 === positionTest) {
      const { listNumber } = generateKarepelinTest();
      setNumbers(numbers.concat(listNumber));
    }
  }, [numbers, positionTest]);

  useEffect(() => {
    // generate test
    if (isStart) {
      const mapTest: number[][] = [];
      for (let i = 0; i < numbers.length; i++) {
        if (i < numbers.length) {
          mapTest.push([
            numbers[i],
            numbers[i + 1],
            numbers[i] + numbers[i + 1],
          ]);
        }
      }
      setTest(mapTest);
    }
  }, [isStart, numbers]);

  useEffect(() => {
    // set position test
    const element = document.getElementById(`#${positionTest}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [positionTest]);

  useEffect(() => {
    // set time test
    if (isStart) {
      setTime(
        new Date(
          new Date().setMinutes(new Date().getMinutes() + timer),
        ).toISOString(),
      );
    }
  }, [isStart, timer]);

  useEffect(() => {
    // closed test
    if (isStart) {
      const idTimeOut = setTimeout(
        () => {
          setIsStart(false);
          setIsOpenDrawer(true);
        },
        1000 * timer * 60,
      );

      return () => clearTimeout(idTimeOut);
    }
  }, [isStart, timer]);

  return {
    numbers,
    test,
    setPositionTest,
    positionTest,
    isStart,
    setIsStart,
    timer,
    setTimer,
    time,
    isOpenDrawer,
    setIsOpenDrawer,
  };
};
