import { ExecutorContext, joinPathFragments } from '@nx/devkit';
import { CDKTFExecutorCommandOptions } from '../types/executor';
import * as esbuild from 'esbuild';
import { spawn } from 'child_process';
import { splitArgs } from './helpers';

export const executeCDKTF = <
  T extends keyof CDKTFExecutorCommandOptions,
  K extends CDKTFExecutorCommandOptions[T]
>(
  command: T,
  args: (keyof K)[],
  options: K,
  ctx: ExecutorContext
) =>
  new Promise((resolve, reject) => {
    ctx.projectName;
    // split positionals to pass as args
    const [positionals, extra] = splitArgs(options, args);
    // remove entry from options list
    const { entry, ...rest } = extra;

    const projectConfig = ctx.projectGraph.nodes[ctx.projectName];
    const appRoot = joinPathFragments(ctx.root, projectConfig.data.root);

    // build the code to execute
    const a = esbuild.buildSync({
      entryPoints: [joinPathFragments(appRoot, entry)],
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
      [
        ...command.split(' '),
        // override the "app" command with the built code
        // eslint-disable-next-line no-useless-escape
        `--app='node -e \'${a.outputFiles[0].text}\''`,
        // pass the command-specific options
        ...Object.entries(rest).flatMap(([key, value]) => [
          `--${key}`,
          value.toString(),
        ]),
        // apply the args (stack name, etc.)
        ...Object.values(positionals),
      ],
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
      console.error(`child process exited with code ${code.toString()}`);
      resolve({ success: true });
    });
  });
