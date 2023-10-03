import { ExecutorContext, joinPathFragments, logger } from '@nx/devkit';
import { CDKTFExecutorCommandOptions } from '../types/executor';
import * as esbuild from 'esbuild';
import { spawn } from 'child_process';
import { splitArgs } from './helpers';
import { existsSync, mkdirSync, readFile, writeFile } from 'fs';
import * as crypto from 'crypto';

export const executeCDKTF = <
  T extends keyof CDKTFExecutorCommandOptions,
  K extends CDKTFExecutorCommandOptions[T]
>(
  command: T,
  args: (keyof K)[],
  options: K,
  ctx: ExecutorContext
) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    ctx.projectName;
    // split positionals to pass as args
    const [positionals, extra] = splitArgs(options, args);
    // remove entry from options list
    const { entry, tsConfig, ...rest } = extra;

    const projectConfig = ctx.projectGraph.nodes[ctx.projectName];
    const appRoot = joinPathFragments(ctx.root, projectConfig.data.root);

    const tmpFileName = crypto.randomBytes(15).toString('hex') + '.js';
    const tmpRoot = appRoot + '/tmp/';
    if (!(await existsSync(tmpRoot))) mkdirSync(tmpRoot, { recursive: true });

    // build the code to execute
    const compiledJs = await esbuild.build({
      entryPoints: [joinPathFragments(appRoot, entry)],
      bundle: true,
      outfile: tmpRoot + tmpFileName,
      platform: 'node',
      target: 'node18',
      // write: false,
      // external: ['cdktf'],
      format: 'cjs',
      
    })

    if (compiledJs.errors.length > 0) {
      for (const error of compiledJs.errors) {
        logger.error(JSON.stringify(error));
      }
      resolve({ success: false });
    }

    const child = spawn(
      'cdktf',
      [
        ...command.split(' '),
        // override the "app" command with the built code
        // eslint-disable-next-line no-useless-escape
        `--app='node ${'tmp/' + tmpFileName}'`,
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
      logger.log(data.toString());
    });
    child.stderr.on('data', (data) => {
      logger.error(data.toString());
    });
    child.on('exit', (code) => {
      logger.info(`Child process exited with code ${code.toString()}`);
      resolve({ success: code === 0 });
    });
  });
