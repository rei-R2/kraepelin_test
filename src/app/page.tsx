"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import ListTest from "../customeComponents/fragments/list_test";
import { useKraepelin } from "../hooks/kraepelinHooks";
import InputUser from "../customeComponents/fragments/input_user";
import ResultTest from "../customeComponents/fragments/result_test";
import useUser from "@/hooks/userHooks";
import Header from "../customeComponents/fragments/header";

export default function App() {
  const {
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
  } = useKraepelin();
  const {
    input,
    setInput,
    recordInputUser,
    dataChart,
    result,
    lableTimeDataChart,
  } = useUser(setPositionTest, isStart, timer, positionTest, test);

  return (
    <main className="relative flex h-screen items-center overflow-hidden bg-primary-foreground px-5 py-5 dark:bg-primary">
      {/* header */}
      <Header isStart={isStart} timer={timer} setTimer={setTimer} time={time} />

      <div className="relative mx-auto flex h-fit w-full items-center px-32">
        {/* list user */}
        <ListTest numbers={numbers} />

        {/* input user */}
        <InputUser
          input={input}
          setInput={setInput}
          recordInputUser={recordInputUser}
          isStart={isStart}
          result={result}
        />

        {/* layer */}
        <div
          className={`${
            isStart ? "scale-0" : "scale-100"
          } absolute left-1/2 top-0 z-20 flex h-full w-full origin-center -translate-x-1/2 items-center justify-center gap-y-6 bg-primary-foreground transition duration-200 dark:bg-primary md:w-80 lg:w-[35rem]`}
        >
          <button
            onClick={() => setIsStart((start) => !start)}
            className="bg-gradient-to-b from-primary to-primary-foreground bg-clip-text text-4xl font-bold text-transparent dark:from-primary-foreground dark:to-primary"
          >
            START
          </button>
        </div>
      </div>

      {/* result test */}
      <div className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2 md:bottom-10">
        <Drawer open={isOpenDrawer} onOpenChange={setIsOpenDrawer}>
          <DrawerTrigger className="text-sm text-gray-500 underline decoration-gray-300 decoration-2 dark:text-gray-400 dark:decoration-[#3b3b41]">
            See Result
          </DrawerTrigger>
          <DrawerContent className="dark:bg-primary-foreground">
            <DrawerHeader>
              <DrawerTitle className="text-center text-gray-800">
                Result
              </DrawerTitle>
            </DrawerHeader>
            <ResultTest
              result={result}
              dataChart={dataChart}
              lableTimeDataChart={lableTimeDataChart}
            />
            <DrawerFooter>
              <DrawerClose>
                <Button className="dark:bg-primary dark:text-primary-foreground dark:hover:bg-gray-800">
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </main>
  );
}
