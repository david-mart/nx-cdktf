export interface CDKTFExecutorBaseOptions {
  /**
   * The path of the entrypoint file (relative to the project root)
   * @default: "main.ts"
   */
  entry: string;

  /**
   * Output directory for the synthesized Terraform config
   * @default: "cdktf.out"
   */
  output: string;
}
export interface CDKTFSynthOptions extends CDKTFExecutorBaseOptions {
  /**
   * Should `codeMakerOutput` existence check be performed? By default it will be checked if providers or modules are configured.
   */
  chechCodeMarkerOutput: boolean;
}

export interface CDKTFExecutorCommands {
  synth: CDKTFSynthOptions;
  // deploy: string;
  // destroy: string;
  // get: string;
  // import: string;
  // diff: string;
  // ls: string;
  // version: string;
  // init: string;
}
