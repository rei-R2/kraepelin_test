export default function ListTest({ numbers }: { numbers: number[] }) {
  return (
    <>
      {/* shadow */}
      <div className="absolute left-1/2 top-0 z-20 h-36 w-32 -translate-x-1/2 bg-gradient-to-b from-primary-foreground to-transparent dark:from-[#09090b] dark:to-transparent" />
      {/* numbers */}
      <div
        id="listNumber"
        className="relative z-10 mx-auto h-[25rem] w-fit overflow-hidden bg-primary-foreground duration-500 dark:bg-primary lg:h-[31rem]"
      >
        {numbers.map((test, i) => (
          <p
            key={i}
            id={`#${i}`}
            className={`${i === 0 ? "text-transparent dark:text-transparent" : "text-primary dark:text-gray-200"} px-2 py-3 text-center text-7xl font-bold text-primary lg:px-3 lg:text-8xl`}
          >
            {test}
          </p>
        ))}
      </div>
      {/* shadow */}
      <div className="absolute bottom-0 left-1/2 z-20 h-36 w-32 -translate-x-1/2 bg-gradient-to-t from-primary-foreground to-transparent dark:from-[#09090b] dark:to-transparent" />
    </>
  );
}
