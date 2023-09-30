import { TerraformStack } from 'cdktf';
import { Construct } from 'constructs';

class ProjectStack extends TerraformStack {
  constructor(
    scope: Construct,
    public id: string = 'project',
    ...dependencies: TerraformStack[]
  ) {
    super(scope, id);
    for (const dependency of dependencies) {
      this.addDependency(dependency);
    }
  }
}

export default ProjectStack;
