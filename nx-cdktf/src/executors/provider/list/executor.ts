import { CDKTFProviderListOptions } from './schema';
import { ExecutorContext } from '@nx/devkit';
import { executeCDKTF } from '../../../utils/execute-cdktf';

export default (options: CDKTFProviderListOptions, ctx: ExecutorContext) =>
  executeCDKTF('provider list', [], options, ctx);
