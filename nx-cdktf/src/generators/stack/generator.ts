import {
  addProjectConfiguration,
  applyChangesToString,
  ChangeType,
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  readProjectConfiguration,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { StackGeneratorSchema } from './schema';

export async function stackGenerator(
  tree: Tree,
  options: StackGeneratorSchema
) {
  const project = readProjectConfiguration(tree, options.project);
  const indexFilePath = joinPathFragments(project.root, 'main.ts');
  const { fileName, className, constantName } = names(options.name);

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    path.join(project.sourceRoot, fileName),
    {
      className,
      fileName,
    }
  );
  const indexSource = tree.read(indexFilePath, 'utf-8');

  const changes = applyChangesToString(indexSource, [
    {
      type: ChangeType.Insert,
      index: 0,
      text: `import ${className}Stack from './src/${fileName}';\n`,
    },
    {
      type: ChangeType.Insert,
      index: indexSource.indexOf('app.synth()'),
      text: `\nnew ${className}Stack(app, '${fileName}');\n`,
    },
  ]);
  tree.write(indexFilePath, changes);

  await formatFiles(tree);
}

export default stackGenerator;
