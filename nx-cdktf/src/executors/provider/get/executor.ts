import { CDKTFProviderGetOptions } from './schema';
import { ExecutorContext } from '@nx/devkit';
import { executeCDKTF } from '../../../utils/execute-cdktf';

export default (options: CDKTFProviderGetOptions, ctx: ExecutorContext) =>
  executeCDKTF('provider get', [], options, ctx);
