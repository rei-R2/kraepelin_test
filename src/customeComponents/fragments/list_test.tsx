export default function ListTest({
  listNumber,
  listTestRef,
  heightPerItemTest,
}: {
  listNumber: number[];
  listTestRef: React.MutableRefObject<HTMLDivElement | null>;
  heightPerItemTest: number;
}) {
  return (
    <div className="relative z-10 mx-auto h-[25rem] w-fit overflow-hidden lg:h-[31rem]">
      <div className="absolute left-0 top-0 z-10 h-36 w-full bg-gradient-to-b from-primary-foreground to-transparent dark:from-[#09090b] dark:to-transparent" />
      <div
        ref={listTestRef}
        style={{ transform: `translateY(${heightPerItemTest}px)` }}
        className={`transform bg-primary-foreground duration-500 dark:bg-primary`}
      >
        {listNumber.map((test, i) => (
          <p
            key={i}
            className="px-2 py-3 text-center text-7xl font-bold text-primary dark:text-gray-200 lg:px-3 lg:text-8xl"
          >
            {test}
          </p>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 z-10 h-36 w-full bg-gradient-to-t from-primary-foreground to-transparent dark:from-[#09090b] dark:to-transparent" />
    </div>
  );
}
