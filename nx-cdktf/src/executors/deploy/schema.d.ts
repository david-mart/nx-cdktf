import { CDKTFExecutorBaseSchema } from '../../types/executor';

export interface SynthExecutorSchema extends CDKTFExecutorBaseSchema {
  /**
   * Should `codeMakerOutput` existence check be performed? By default it will be checked if providers or modules are configured.
   */
  chechCodeMarkerOutput: boolean;
}
