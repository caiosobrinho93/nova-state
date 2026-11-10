import sharp from "sharp";
import { readdir, mkdir, stat, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";

const source = process.argv[2];
if (!source)
  throw new Error("Uso: node scripts/prepare-frames.mjs <pasta-dos-frames>");
const files = (await readdir(source))
  .filter((name) => /^frame_\d+\.webp$/.test(name))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
if (files.length !== 71)
  throw new Error(
    `Esperados 71 frames; encontrados ${files.length}. Atualize o manifesto e src/site.ts se a sequência mudar.`,
  );
const report = {
  source: "Frames fornecidos pelo usuário em Desktop/img-scroll",
  count: files.length,
  inputBytes: 0,
  variants: {},
};
for (const [variant, width, quality] of [
  ["desktop", 1280, 84],
  ["mobile", 768, 78],
]) {
  const output = resolve("public/sequence", variant);
  await mkdir(output, { recursive: true });
  let bytes = 0;
  for (const [index, file] of files.entries()) {
    if (file !== `frame_${String(index + 1).padStart(4, "0")}.webp`)
      throw new Error(`Ordem inválida: ${file}`);
    const input = join(source, file);
    const metadata = await sharp(input).metadata();
    if (metadata.width !== 1280 || metadata.height !== 720)
      throw new Error(`Dimensão inesperada: ${file}`);
    const result = await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 5 })
      .toFile(join(output, file));
    bytes += result.size;
    if (variant === "desktop") report.inputBytes += (await stat(input)).size;
  }
  report.variants[variant] = { width, height: (width * 9) / 16, bytes };
}
await writeFile(
  "public/sequence/manifest.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
