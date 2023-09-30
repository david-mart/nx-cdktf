import { ExecutorContext, joinPathFragments } from '@nx/devkit';
import { CDKTFExecutorCommands } from '../types/executor';
import * as esbuild from 'esbuild';
import { spawn } from 'child_process';

export const executeCDKTF = <
  T extends keyof CDKTFExecutorCommands,
  K extends CDKTFExecutorCommands[T]
>(
  command: T,
  options: K,
  ctx: ExecutorContext
) =>
  new Promise((resolve, reject) => {
    ctx.projectName;

    const projectConfig = ctx.projectGraph.nodes[ctx.projectName];
    const appRoot = joinPathFragments(ctx.root, projectConfig.data.root);
    const a = esbuild.buildSync({
      entryPoints: [joinPathFragments(appRoot, options.entry)],
      bundle: true,
      outfile: 'dist/apps/cdktf/main.js',
      platform: 'node',
      target: 'node14',
      write: false,
      external: ['cdktf'],
      format: 'cjs',
      minify: true,
    });

    const child = spawn(
      'cdktf',
      // eslint-disable-next-line no-useless-escape
      ['synth', "'*'", `--app='node -e \'${a.outputFiles[0].text}\''`],
      {
        cwd: appRoot,
      }
    );
    child.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    child.stderr.on('data', (data) => {
      console.log(data.toString());
    });
    child.on('exit', (code) => {
      console.log(`child process exited with code ${code.toString()}`);
      resolve({ success: true });
    });
  });
