export const generateKarepelinTest = () => {
  const listNumber: Array<number> = [];

  for (let i = 0; i < 10; i++) {
    const random = Math.random() * (9 - 0) + 0;
    listNumber.push(Number(random.toFixed(0)));
  }

  return { listNumber };
};
