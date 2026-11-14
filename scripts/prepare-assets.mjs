import { copyFile, mkdir, rename, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { NodeIO } from '@gltf-transform/core';
import { EXTMeshoptCompression, KHRMeshQuantization } from '@gltf-transform/extensions';
import { MeshoptEncoder } from 'meshoptimizer';

const source = fileURLToPath(new URL('../assets/img/projects/linear-regulator/regulador.min.glb', import.meta.url));
const models = new URL('../public/models/', import.meta.url);
const licenses = new URL('../public/licenses/', import.meta.url);
await Promise.all([mkdir(models, { recursive: true }), mkdir(licenses, { recursive: true }), MeshoptEncoder.ready]);

const io = new NodeIO()
  .registerExtensions([EXTMeshoptCompression, KHRMeshQuantization])
  .registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
const board = await io.read(source);
// Compress the existing quantized geometry without another simplification or quantization pass.
board.createExtension(EXTMeshoptCompression).setRequired(true);
const compressed = new URL('linear-regulator.glb', models);
const temporary = new URL(`linear-regulator.${process.pid}.tmp.glb`, models);
try {
  await io.write(fileURLToPath(temporary), board);
  await rename(temporary, compressed);
} finally {
  await rm(temporary, { force: true });
}

const licenseSources = {
  'inter.txt': '../node_modules/@fontsource-variable/inter/LICENSE',
  'commit-mono.txt': '../node_modules/@fontsource/commit-mono/LICENSE',
  'bootstrap-icons.txt': '../src/assets/icons/LICENSE.bootstrap-icons.txt',
  'meshoptimizer.txt': '../node_modules/meshoptimizer/LICENSE.md',
};
await Promise.all(
  Object.entries(licenseSources).map(([name, source]) =>
    copyFile(new URL(source, import.meta.url), new URL(name, licenses)),
  ),
);
