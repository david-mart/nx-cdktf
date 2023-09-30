import { CDKTFProviderUpgradeOptions } from './schema';
import { ExecutorContext } from '@nx/devkit';
import { executeCDKTF } from '../../../utils/execute-cdktf';

export default (options: CDKTFProviderUpgradeOptions, ctx: ExecutorContext) =>
  executeCDKTF('provider upgrade', ['provider'], options, ctx);
