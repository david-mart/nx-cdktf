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

export interface CDKTFDestroyOptions extends CDKTFExecutorBaseOptions {
  /**
   * Auto approve
   */
  autoApprove: boolean;

  /**
   * Don't check if all stacks specified in the command have their dependencies included as well
   */
  ignoreMissingStackDependencies: boolean;

  /**
   * Number of concurrent CDKTF stacks to run. Defaults to infinity, denoted by -1
   */
  parallelism: number;

  /**
   * Select the "refresh only" planning mode, which checks whether remote objects still match the outcome of the most recent Terraform apply but does not propose any actions to undo any changes made outside of Terraform.
   */
  refreshOnly: boolean;

  /**
   * Forwards value as the `-parallelism` flag to Terraform. By default, the this flag is not forwarded to Terraform. Note: This flag is not supported by remote / cloud backend
   */
  terraformParallelism: number;

  /**
   * Disables terminal formatting sequences in the output.
   */
  noColor: boolean;

  /**
   * Pass this flag after switching state backends to approve a state migration for all targeted stacks
   */
  migrateState: boolean;

  /**
   * Set a value for one of the input variables in the stack or stacks to apply. Use this option more than once to set more than one variable.
   */
  var: string[];

  /**
   * Load variable values from the given file, in addition to the default files terraform.tfvars and *.auto.tfvars. Use this option more than once to include more than one variables file.
   */
  varFile: string[];

  /**
   * Skip synthesis of the application, assume the synthesized Terraform code is already present and up to date
   */
  skipSynth: boolean;
}

export interface CDKTFDeployOptions extends CDKTFDestroyOptions {
  /**
   * Path to file where stack outputs will be written as JSON
   */
  outputsFile: string;

  /**
   * Whether to include sensitive outputs in the output file
   */
  outputsFileIncludeSensitiveOutputs: boolean;
}

export interface CDKTFExecutorCommands {
  synth: CDKTFSynthOptions;
  deploy: CDKTFDestroyOptions;
  destroy: CDKTFDestroyOptions;
  // get: string;
  // import: string;
  // diff: string;
  // ls: string;
  // version: string;
  // init: string;
}
