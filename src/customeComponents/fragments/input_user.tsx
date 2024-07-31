"use client";

import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Input } from "@/components/ui/input";
import clsx from "clsx";

export default function InputUser({
  input,
  setInput,
  recordInputUser,
  isStart,
  result,
}: {
  input: number | null;
  setInput: Dispatch<SetStateAction<number | null>>;
  recordInputUser: number[];
  isStart: boolean;
  result: boolean[];
}) {
  const inputUserRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  useEffect(() => {
    if (isStart) {
      inputUserRef.current?.focus();
    }
  }, [isStart]);

  return (
    <div className="absolute left-[45%] top-1/2 flex h-24 w-24 -translate-y-[57%] items-center justify-end rounded-full border-4 border-gray-300 bg-transparent dark:border-gray-700 lg:left-[48%] lg:h-32 lg:w-32">
      <Input
        ref={inputUserRef}
        type="number"
        value={input ? input : ""}
        onChange={(e) => setInput(Number(e.target.value))}
        className="bg-dark h-10 w-3 translate-x-1 border-[1px] border-gray-200 bg-primary-foreground p-0 text-center text-4xl font-semibold tracking-wide text-teal-500 focus-visible:ring-gray-200 dark:border-gray-800 dark:bg-primary dark:focus-visible:ring-gray-800 lg:h-12"
      />

      {/* answer user */}
      <div className="absolute left-1/2 top-1/2 h-12 w-24 -translate-y-1/2 translate-x-1/2 overflow-hidden lg:w-40 lg:translate-x-[38%]">
        <div className="relative flex h-full w-full items-center">
          {recordInputUser.map((num, i) => (
            <p
              key={i}
              className={clsx(
                "block px-1 text-center text-3xl font-semibold tracking-wide lg:px-2 lg:text-4xl",
                { "text-red-500": !result[i], "text-teal-500": result[i] },
              )}
            >
              {num}
            </p>
          ))}

          <div className="absolute right-0 top-0 z-10 h-12 w-14 bg-gradient-to-l from-primary-foreground to-transparent dark:from-[#09090b] dark:to-transparent" />
        </div>
      </div>
    </div>
  );
}
