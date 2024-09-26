const EventEmitter = require("events");
// import EventEmitter from "events";

class Emitter extends EventEmitter {}

const myE = new Emitter();

myE.on("foo", () => {
  console.log("Event triggered: hey");
});
myE.on("foo", () => {
  console.log("Event triggered: hey 2");
});

myE.on("foo", (x) => {
  console.log("Event triggered: hey 3");
  console.log(x);
});

myE.on("bar", () => {
  console.log("Event triggered only once: bar");
});

// myE.emit("foo"); // Output: Event triggered:
// myE.emit("foo", "some text"); // Output: Event triggered:
console.log("hi");
myE.emit("bar"); // Output: Event triggered:
myE.emit("bar"); // Output: Event triggered:
myE.emit("bar"); // Output: Event triggered:
myE.emit("bar"); // Output: Event triggered:
myE.emit("bar"); // Output: Event triggered:
