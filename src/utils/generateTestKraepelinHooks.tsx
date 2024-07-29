export const generateKarepelinTest = () => {
  const numbers: Array<number> = [];
  const mapTest: number[][] = [];

  for (let i = 0; i < 5000; i++) {
    const random = Math.random() * (9 - 0) + 0;
    numbers.push(Number(random.toFixed(0)));
  }

  for (let j = 0; j < numbers.length; j++) {
    if (j < numbers.length) {
      mapTest.push([numbers[j], numbers[j + 1], numbers[j] + numbers[j + 1]]);
    }
  }

  return { numbers, mapTest };
};
