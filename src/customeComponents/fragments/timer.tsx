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

export default function Timer({
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

  const renderer = ({
    minutes,
    seconds,
  }: {
    minutes: number;
    seconds: number;
  }) => {
    return (
      <div className="translate-x-1 text-end text-2xl font-bold text-gray-800 dark:text-gray-300 md:text-4xl">
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
    <div className="mx-auto flex w-full items-end justify-between md:w-2/3">
      {/* title & mode */}
      <div className="flex h-14 w-fit items-center gap-x-5">
        {/* switch mode */}
        <div className="relative w-fit">
          <div className="scale-[150%] lg:scale-150">
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
        <div className="flex h-full items-center gap-x-3 rounded-full border border-[#cacad3] bg-gray-200 px-6 dark:border-[#3b3b41] dark:bg-[#18181b]">
          <h1 className="font-comfortaa text-sm font-bold text-primary dark:text-primary-foreground md:text-base">
            Test Kraepelin
          </h1>
          <Popover>
            <PopoverTrigger>
              <div className="scale-105">
                <QuestionMarkCircledIcon color="#afafb5" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="text-xs">
              Apa Itu Test Kraepelin?
              <br />
              <br />
              Tes Kraepelin diambil dari nama pengembangnya, seorang psikiater
              asal Jerman bernama Emilie Kraepelin. Tes ini adalah salah satu
              psikotes kerja yang dikembangkan pada awal abad ke-19.
              <br />
              <br />
              Menurut American Psychology Association, tes ini dikembangkan
              untuk mengukur perhatian seseorang dalam jangka waktu yang
              singkat.
              <br />
              <br />
              Salah satu tujuan utama dari tes Kraepelin adalah untuk menilai
              ketahanan konsentrasi dan kepribadian seseorang. Terutama ketika
              mereka mekerjakan suatu tugas di dunia kerja. Tes ini juga
              termasuk ke dalam tes kecepatan yang ditunjukan dengan banyaknya
              angka yang harus dikerjakan dalam waktu terbatas.
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* timer */}
      <div className="lg:flex lg:items-center lg:gap-x-5">
        {/* setting time */}
        <div className="flex items-center gap-x-2">
          <Label
            htmlFor="timer"
            className="text-xs text-gray-500 dark:text-gray-300"
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
              className="w-full rounded-full border-transparent px-0 text-xs text-primary focus:ring-0 dark:border-transparent dark:text-gray-300 dark:ring-0 dark:focus:ring-0 md:text-base lg:text-sm"
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

        <div className="relative z-20 flex justify-end">
          {isStart ? (
            <Countdown targetDate={time} renderer={renderer} />
          ) : (
            <div className="text-end text-2xl font-bold text-gray-800 dark:text-gray-300 md:text-4xl">
              <span>0{timer}:00</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
