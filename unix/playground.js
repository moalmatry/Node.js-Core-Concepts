const { spawn, exec } = require("node:child_process");
const { stdin, stdout, stderr, env, argv, pid, ppid } = require("node:process");

// ** Standard In, Standard Out, Standard Error */
// stdin.on("data", (data) => {
//   // The next 2 lines will do the same thing:
//   // console.log("Got this data from standard in: ", data.toString("utf8"));
//   stdout.write(`Got this data from standard in: ${data.toString("utf8")}\n`);
// });
// stdout.write("This is some text that I want.\n");
// stderr.write("This is some text that I may not want.");

// ** Arguments */
// console.log(argv);

//** Process and Parent Process ID */
// console.log(pid);
// console.log(ppid);

//** Environment Variables */
// console.log(env);
// console.log(env.MODE);
// console.log(env.PATH);
// console.log(env.PWD);

//** Spawning a process */
const subprocess = spawn(
  "./playground",
  ["some string", "-f", 34, "some more string", "-u"],
  {
    env: { MODE: "development" },
  }
);

subprocess.stdout.on("data", (data) => {
  console.log(data.toString("utf-8"));
});

subprocess.stderr.on("data", (data) => {
  console.log("Got this stderr from the C app: ", data.toString("utf8"));
});

subprocess.stdin.write("Some text that is coming from Node!");
subprocess.stdin.end();

//** Running a script in a shell */
// exec(
//   " source .bashrc && echo 'something string' | tr ' ' '\n'",
//   {
//     shell: "/bin/bash",
//   },
//   (error, stdout, stderr) => {
//     if (error) {
//       console.error(error);
//       return;
//     }

//     console.log(stdout);

//     console.log(`stderr: ${stderr}`);
//   }
// );
