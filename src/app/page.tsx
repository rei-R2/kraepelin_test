"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import ListTest from "../customeComponents/fragments/list_test";
import { useKraepelin } from "../hooks/kraepelinHooks";
import InputUser from "../customeComponents/fragments/input_user";
import Timer from "../customeComponents/fragments/timer";
import ResultTest from "../customeComponents/fragments/result_test";

export default function App() {
  const {
    listNumber,
    listTestRef,
    heightPerItemTest,
    isStart,
    setIsStart,
    inputUserRef,
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
  } = useKraepelin();

  return (
    <main className="h-screen overflow-hidden bg-primary-foreground px-5 py-5 dark:bg-primary">
      {/* header */}
      <Timer isStart={isStart} timer={timer} setTimer={setTimer} time={time} />

      <div className="flex h-full items-center">
        {/* random test */}
        <div className="relative mx-auto mt-5 h-fit w-full -translate-y-16 px-32 py-10">
          {/* list user */}
          <ListTest
            listNumber={listNumber}
            listTestRef={listTestRef}
            heightPerItemTest={heightPerItemTest}
          />

          {/* input user */}
          <InputUser
            isStart={isStart}
            inputUserRef={inputUserRef}
            inputUser={inputUser}
            setInputUser={setInputUser}
            recordInputUser={recordInputUser}
            result={result}
          />

          {/* layer */}
          <div
            className={`${
              isStart ? "scale-0" : "scale-100"
            } absolute left-1/2 top-0 z-20 flex h-full w-full origin-center -translate-x-1/2 flex-col items-center justify-center gap-y-6 backdrop-blur-lg transition duration-200 md:w-80 lg:w-[35rem]`}
          >
            <Button
              onClick={() => setIsStart((start) => !start)}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Start
            </Button>

            {/* result test */}
            <Drawer open={isOpenDrawer} onOpenChange={setIsOpenDrawer}>
              <DrawerTrigger className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 dark:bg-primary-foreground">
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
        </div>
      </div>
    </main>
  );
}
