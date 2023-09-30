import { CDKTFDeployOptions } from './schema';
import { ExecutorContext } from '@nx/devkit';
import { executeCDKTF } from '../../utils/execute-cdktf';

export default (options: CDKTFDeployOptions, ctx: ExecutorContext) =>
  executeCDKTF('deploy', ['stacks'], options, ctx);
