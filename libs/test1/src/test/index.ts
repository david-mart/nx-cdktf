import { TerraformStack } from 'cdktf';
import { Construct } from 'constructs';

class TestStack extends TerraformStack {
  constructor(
    scope: Construct,
    public id: string = 'test',
    ...dependencies: TerraformStack[]
  ) {
    super(scope, id);
    for (const dependency of dependencies) {
      this.addDependency(dependency);
    }
  }
}

export default TestStack;
