import { ProjectConfiguration, TargetConfiguration } from '@nx/devkit';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CDKTFExecutorBaseOptions {
  /**
   * The path of the entrypoint file (relative to the project root)
   * @default: "main.ts"
   */
  entry: string;
}
export interface CDKTFSynthOptions extends CDKTFExecutorBaseOptions {
  /**
   * Output directory for the synthesized Terraform config
   * @default: "cdktf.out"
   */
  output: string;

  /**
   * Should `codeMakerOutput` existence check be performed? By default it will be checked if providers or modules are configured
   */
  checCodeMarkerOutput: boolean;
}

export interface CDKTFDestroyOptions extends CDKTFExecutorBaseOptions {
  /**
   * Deploy stacks matching the given ids. Required when more than one stack is present in the app.
   * Leave empty to apply to all stacks.
   */
  stacks: string[];

  /**
   * Auto approve
   */
  autoApprove?: boolean;

  /**
   * Don't check if all stacks specified in the command have their dependencies included as well
   */
  ignoreMissingStackDependencies?: boolean;

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
   * Output directory for the synthesized Terraform config
   * @default: "cdktf.out"
   */
  output: string;

  /**
   * Path to file where stack outputs will be written as JSON
   */
  outputsFile: string;

  /**
   * Whether to include sensitive outputs in the output file
   */
  outputsFileIncludeSensitiveOutputs: boolean;
}

export interface CDKTFProviderUpgradeOptions extends CDKTFExecutorBaseOptions {
  /**
   * Name of the provider to add. Can include a version constraint (e.g. aws@~>4.0).
   */
  provider: string[];
}

export interface CDKTFProviderAddOptions extends CDKTFProviderUpgradeOptions {
  /**
   * Force local provider installation, even if pre-built provider exists
   */
  forceLocal: boolean;
}
export interface CDKTFProviderGetOptions extends CDKTFExecutorBaseOptions {
  /**
   * Output directory for generated Constructs
   */
  output: string;

  /**
   * Output programming language. Only "typescript" is supported in the NX plugin.
   */
  language: 'typescript';

  /**
   * Regenerates all generated constructs
   */
  force: boolean;

  /**
   * Number of concurrently generated provider / module bindings. Only applies for languages that are not Typescript (translated by JSII). Defaults to infinity, denoted by -1
   */
  parallelism: number;

  /**
   * Shows performance information after generation
   */
  showPerformanceInfo: boolean;
}
export interface CDKTFProviderListOptions extends CDKTFExecutorBaseOptions {
  /**
   * Get providers list as json
   */
  json: boolean;
}

export interface CDKTFExecutorCommandOptions {
  /**
   * Synthesizes Terraform code for the given app in a directory
   */
  synth: CDKTFSynthOptions;

  /**
   * Deploy the given stacks
   */
  deploy: CDKTFDeployOptions;

  /**
   * Destroy the given stacks
   */
  destroy: CDKTFDestroyOptions;

  /**
   * Add one or more Terraform providers to your project.
   */
  'provider add': CDKTFProviderAddOptions;

  /**
   * Generate CDK Constructs for Terraform providers and modules.
   */
  'provider get': CDKTFProviderGetOptions;
  'provider list': CDKTFProviderListOptions;
  'provider upgrade': CDKTFProviderUpgradeOptions;
}

export interface CDKTFExecutors {
  synth?: TargetConfiguration<CDKTFSynthOptions>;
  deploy?: TargetConfiguration<CDKTFDeployOptions>;
  destroy?: TargetConfiguration<CDKTFDestroyOptions>;
  'add-provider'?: TargetConfiguration<CDKTFProviderAddOptions>;
  'get-providers'?: TargetConfiguration<CDKTFProviderGetOptions>;
  'list-providers'?: TargetConfiguration<CDKTFProviderListOptions>;
  'upgrade-provider'?: TargetConfiguration<CDKTFProviderUpgradeOptions>;
  [key: string]: TargetConfiguration;
}

export interface CDKTFExecutorCommandArgs {
  synth: [];
  deploy: [];
  destroy: [];
}
