console.log("1. Script start (sync)");

// setTimeout goes to the macrotask queue, so it runs last
setTimeout(() => {
  console.log("6. setTimeout 1 (macrotask)");

  // a promise created inside a timeout still runs before the next timeout
  Promise.resolve().then(() => {
    console.log("7. Promise inside setTimeout 1 (microtask)");
  });
}, 0);

setTimeout(() => {
  console.log("8. setTimeout 2 (macrotask)");
}, 0);

// promise callbacks go to the microtask queue
Promise.resolve().then(() => {
  console.log("3. Promise.then (microtask)");

  // a microtask added from inside a microtask also runs before any timeout
  queueMicrotask(() => {
    console.log("5. Microtask added from inside a promise");
  });
});

// queueMicrotask puts the function directly in the microtask queue
queueMicrotask(() => {
  console.log("4. queueMicrotask (microtask)");
});

console.log("2. Script end (sync)");