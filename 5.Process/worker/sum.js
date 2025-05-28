let sum = 0;
for (let i = 0; i < 100 * 10000 * 10000; i++) {
  sum += i;
}
// console.log(sum);
process.stdout.write(sum);
