import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
  addDependenciesToPackageJson,
  installPackagesTask,
  joinPathFragments,
} from '@nx/devkit';
import * as path from 'path';
import * as crypto from 'crypto';

import { InitGeneratorSchema } from './schema';

export async function initGenerator(tree: Tree, options: InitGeneratorSchema) {
  addDependenciesToPackageJson(
    tree,
    { cdktf: 'latest' },
    { constructs: 'latest' }
  );
  const projectRoot =
    options.directory || joinPathFragments('apps', options.name);
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'application',
    sourceRoot: `${projectRoot}/src`,
    targets: {
      synth: {
        executor: 'nx-cdktf:synth',
        options: {
          entry: `main.ts`,
          output: joinPathFragments(projectRoot, 'cdktf.out'),
        },
      },
    },
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...options,
    hash: crypto.randomBytes(16).toString('hex'),
  });

  await formatFiles(tree);
  return () => installPackagesTask(tree);
}

export default initGenerator;
