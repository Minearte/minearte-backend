const fileNames: string[] = [];

async function readDir(dir: string) {
  for await (const dirEntry of Deno.readDir(dir)) {
    if (
      dirEntry.isFile &&
      dirEntry.name.endsWith(".ts") &&
      dirEntry.name !== "all.ts"
    ) {
      fileNames.push(dirEntry.name);
    }

    if(dirEntry.isDirectory){
        readDir("src/tests/"+dirEntry.name)
    }
  }
}

await readDir("src/tests/")

for (const fileName of fileNames) {
  console.log(`Running ${fileName}...`);
  const p = Deno.run({
    cmd: ["deno", "test", "-A", `src/tests/${fileName}`],
  });
  await p.status();
}
console.log(fileNames);
