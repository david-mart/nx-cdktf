import { CDKTFDestroyOptions } from './schema';
import { ExecutorContext } from '@nx/devkit';
import { executeCDKTF } from '../../utils/execute-cdktf';

export default (options: CDKTFDestroyOptions, ctx: ExecutorContext) =>
  executeCDKTF('destroy', ['stacks'], options, ctx);
