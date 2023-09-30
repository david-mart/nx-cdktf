import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
  addDependenciesToPackageJson,
  installPackagesTask,
  joinPathFragments,
  names,
  offsetFromRoot,
  writeJson,
} from '@nx/devkit';
import * as path from 'path';
import * as crypto from 'crypto';

import { InitGeneratorSchema } from './schema';
import * as t from '../../types/executor';

const createProjectConfig = (
  tree: Tree,
  fileName: string,
  projectRoot: string
) => {
  addProjectConfiguration(tree, fileName, {
    root: projectRoot,
    projectType: 'application',
    sourceRoot: `${projectRoot}/src`,
    targets: {
      synth: {
        executor: 'nx-cdktf:synth',
        options: {},
      },
      deploy: {
        executor: 'nx-cdktf:deploy',
        options: {},
      },
      destroy: {
        executor: 'nx-cdktf:destroy',
        options: {},
      },
      'add-provider': {
        executor: 'nx-cdktf:add-provider',
        options: {},
      },
      'get-providers': {
        executor: 'nx-cdktf:get-providers',
        options: {},
      },
      'list-providers': {
        executor: 'nx-cdktf:list-providers',
        options: {},
      },
      'upgrade-provider': {
        executor: 'nx-cdktf:upgrade-provider',
        options: {},
      },
    } as t.CDKTFExecutors,
  });
};

export function getRootTsConfigPathInTree(tree: Tree): string | null {
  for (const path of ['tsconfig.base.json', 'tsconfig.json']) {
    if (tree.exists(path)) {
      return path;
    }
  }

  return 'tsconfig.base.json';
}

export function getRelativePathToRootTsConfig(
  tree: Tree,
  targetPath: string
): string {
  return offsetFromRoot(targetPath) + getRootTsConfigPathInTree(tree);
}

function createProjectTsConfigJson(
  tree: Tree,
  options: { projectRoot: string; rootProject: boolean }
) {
  const tsconfig = {
    extends: options.rootProject
      ? undefined
      : getRelativePathToRootTsConfig(tree, options.projectRoot),
    compilerOptions: {},
    files: [],
    include: ['**/*.ts'],
    exclude: ['node_modules', 'cdktf.out'],
  };
  writeJson(
    tree,
    joinPathFragments(options.projectRoot, 'tsconfig.json'),
    tsconfig
  );
}

export async function initGenerator(tree: Tree, options: InitGeneratorSchema) {
  addDependenciesToPackageJson(
    tree,
    { cdktf: 'latest' },
    { constructs: 'latest' }
  );
  const { fileName } = names(options.name.trim());
  const projectRoot = options.directory || joinPathFragments('apps', fileName);

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...options,
    hash: crypto.randomBytes(16).toString('hex'),
    projectName: fileName,
  });

  createProjectConfig(tree, fileName, projectRoot);

  createProjectTsConfigJson(tree, { projectRoot, rootProject: false });
  await formatFiles(tree);
  return () => installPackagesTask(tree);
}

export default initGenerator;
