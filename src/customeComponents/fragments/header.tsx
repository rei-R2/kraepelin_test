import Countdown from "react-countdown-simple";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  MoonIcon,
  SunIcon,
  LapTimerIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

export default function Header({
  isStart,
  timer,
  setTimer,
  time,
}: {
  isStart: boolean;
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  time: string;
}) {
  const { setTheme } = useTheme();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    isDark ? setTheme("dark") : setTheme("light");
  }, [isDark, setTheme]);

  return (
    <div className="absolute left-1/2 top-8 z-30 mx-auto flex w-full -translate-x-1/2 items-end justify-between px-5 md:top-10 md:w-2/3">
      {/* title & mode */}
      <div className="flex h-10 w-fit items-center gap-x-3 md:h-12 md:gap-x-5">
        {/* switch mode */}
        <div className="relative w-fit">
          <div className="scale-110 md:scale-150">
            {isDark ? <MoonIcon /> : <SunIcon />}
          </div>
          <div className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 opacity-0">
            <Switch
              id="theme"
              checked={isDark}
              onCheckedChange={() => setIsDark(!isDark)}
            />
          </div>
        </div>
        {/* title */}
        <div className="flex h-full items-center gap-x-3 rounded-full border border-[#cacad3] bg-gray-200 px-3 dark:border-[#3b3b41] dark:bg-[#18181b] md:px-6">
          <h1 className="text-nowrap font-comfortaa text-xs font-bold text-primary dark:text-primary-foreground md:text-sm">
            Test Kraepelin
          </h1>
          <Popover>
            <PopoverTrigger>
              <div className="scale-105">
                <QuestionMarkCircledIcon color="#afafb5" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="overflow-hidden p-0 text-xs">
              <div className="h-72 overflow-y-scroll bg-[#18181b] p-4 text-gray-200 dark:bg-gray-200 dark:text-gray-700 md:h-full md:overflow-auto">
                <p className="mb-3">Apa Itu Test Kraepelin?</p>
                <p className="mb-3">
                  Tes Kraepelin diambil dari nama pengembangnya, seorang
                  psikiater asal Jerman bernama Emilie Kraepelin. Tes ini adalah
                  salah satu psikotes kerja yang dikembangkan pada awal abad
                  ke-19.
                </p>
                <p className="mb-3">
                  Menurut American Psychology Association, tes ini dikembangkan
                  untuk mengukur perhatian seseorang dalam jangka waktu yang
                  singkat.
                </p>
                <p className="mb-3">
                  Salah satu tujuan utama dari tes Kraepelin adalah untuk
                  menilai ketahanan konsentrasi dan kepribadian seseorang.
                  Terutama ketika mereka mekerjakan suatu tugas di dunia kerja.
                  Tes ini juga termasuk ke dalam tes kecepatan yang ditunjukan
                  dengan banyaknya angka yang harus dikerjakan dalam waktu
                  terbatas.
                </p>
                <Image
                  src={"/test_kraepelin.png"}
                  alt="test_kraepelin"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* timer */}
      <Timer isStart={isStart} timer={timer} setTimer={setTimer} time={time} />
    </div>
  );
}

function Timer({
  isStart,
  timer,
  setTimer,
  time,
}: {
  isStart: boolean;
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  time: string;
}) {
  const renderer = ({
    minutes,
    seconds,
  }: {
    minutes: number;
    seconds: number;
  }) => {
    return (
      <div className="text-end font-poppins text-lg text-gray-800 dark:text-gray-300 md:text-2xl">
        {!minutes && !seconds ? (
          <span>0{timer}:00</span>
        ) : (
          <span>
            {`${minutes}`.length < 2 ? `0${minutes}` : minutes}:
            {`${seconds}`.length < 2 ? `0${seconds}` : seconds}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-10 gap-x-2 md:h-12 md:gap-x-4">
      {/* setting time */}
      <div className="flex items-center gap-x-2">
        <Label
          htmlFor="timer"
          className="text-xs text-gray-500 dark:text-gray-400"
        >
          <LapTimerIcon />
        </Label>
        <Select
          defaultValue="1"
          disabled={isStart}
          onValueChange={(value) => setTimer(Number(value))}
        >
          <SelectTrigger
            id="timer"
            className="w-full rounded-full border-transparent p-0 text-xs text-primary focus:ring-0 dark:border-transparent dark:text-gray-300 dark:ring-0 dark:focus:ring-0"
          >
            <SelectValue placeholder="Select Duration Test" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Duration Test</SelectLabel>
              <SelectItem value="1">1 Menit</SelectItem>
              <SelectItem value="3">3 Menit</SelectItem>
              <SelectItem value="5">5 Menit</SelectItem>
              <SelectItem value="8">8 Menit</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="relative z-20 flex h-full w-20 items-center justify-center rounded-full border border-[#cacad3] bg-gray-200 dark:border-[#3b3b41] dark:bg-[#18181b] md:w-32">
        {isStart ? (
          <Countdown targetDate={time} renderer={renderer} />
        ) : (
          <div className="text-end font-poppins text-lg text-gray-800 dark:text-gray-300 md:text-2xl">
            <span>0{timer}:00</span>
          </div>
        )}
      </div>
    </div>
  );
}
