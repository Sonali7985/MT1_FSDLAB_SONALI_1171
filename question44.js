
// Makes a fake task that just waits for `ms` milliseconds
const makeTask = (id, ms) => () =>
  new Promise((resolve) => {
    console.log(`Task ${id} started`);
    setTimeout(() => {
      console.log(`Task ${id} done`);
      resolve();
    }, ms);
  });

const tasks = [
  makeTask(1, 2000),
  makeTask(2, 1000),
  makeTask(3, 3000),
  makeTask(4, 1500),
  makeTask(5, 2000),
  makeTask(6, 1000),
];

// Runs all tasks, but only `limit` of them at the same time
async function runWithLimit(tasks, limit) {
  let next = 0;

  // Each worker keeps grabbing the next task until none are left
  async function worker() {
    while (next < tasks.length) {
      const task = tasks[next++];
      await task();
    }
  }

  const workers = Array.from({ length: limit }, worker);
  await Promise.all(workers);

  console.log("All done!");
}

runWithLimit(tasks, 3);