import { copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const source = new URL('../assets/img/projects/linear-regulator/regulador.min.glb', import.meta.url);
const destination = new URL('../public/models/', import.meta.url);
await mkdir(destination, { recursive: true });
await copyFile(source, new URL('linear-regulator.glb', destination));
const licenses = new URL('../public/licenses/', import.meta.url);
await mkdir(licenses, { recursive: true });
await copyFile(new URL('../node_modules/@fontsource-variable/inter/LICENSE', import.meta.url), new URL('inter.txt', licenses));
await copyFile(new URL('../node_modules/@fontsource/commit-mono/LICENSE', import.meta.url), new URL('commit-mono.txt', licenses));
await copyFile(new URL('../src/assets/icons/LICENSE.bootstrap-icons.txt', import.meta.url), new URL('bootstrap-icons.txt', licenses));
console.log(`Prepared PCB model: ${fileURLToPath(destination)}`);
