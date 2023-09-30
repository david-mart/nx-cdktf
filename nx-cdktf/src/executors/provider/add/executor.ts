import { CDKTFProviderAddOptions } from './schema';
import { ExecutorContext } from '@nx/devkit';
import { executeCDKTF } from '../../../utils/execute-cdktf';

export default (options: CDKTFProviderAddOptions, ctx: ExecutorContext) =>
  executeCDKTF('provider add', ['provider'], options, ctx);
