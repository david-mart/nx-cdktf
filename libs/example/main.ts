import ProjectStack from './src/project';
import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';

const app = new App();

new ProjectStack(app, 'project');
app.synth();
