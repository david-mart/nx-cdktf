import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
  addDependenciesToPackageJson,
  installPackagesTask,
  joinPathFragments,
  names,
} from '@nx/devkit';
import * as path from 'path';
import * as crypto from 'crypto';

import { InitGeneratorSchema } from './schema';
import * as t from '../../types/executor';

export async function initGenerator(tree: Tree, options: InitGeneratorSchema) {
  addDependenciesToPackageJson(
    tree,
    { cdktf: 'latest' },
    { constructs: 'latest' }
  );
  const { fileName } = names(options.name.trim());
  const projectRoot = options.directory || joinPathFragments('apps', fileName);
  addProjectConfiguration(tree, fileName, {
    root: projectRoot,
    projectType: 'application',
    sourceRoot: `${projectRoot}/src`,
    targets: {
      synth: {
        executor: 'nx-cdktf:synth',
        options: {
          output: joinPathFragments(projectRoot, 'cdktf.out'),
        },
      },
      deploy: {
        executor: 'nx-cdktf:deploy',
        options: {
          output: joinPathFragments(projectRoot, 'cdktf.out'),
        },
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
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...options,
    hash: crypto.randomBytes(16).toString('hex'),
  });

  await formatFiles(tree);
  return () => installPackagesTask(tree);
}

export default initGenerator;
