import { CDKTFSynthOptions } from '../../types/executor';
import { ExecutorContext } from '@nx/devkit';
import { executeCDKTF } from '../../utils/execute-cdktf';

export default (options: CDKTFSynthOptions, ctx: ExecutorContext) =>
  executeCDKTF('synth', options, ctx);
