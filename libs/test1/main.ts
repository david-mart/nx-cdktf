import TestStack from './src/test';
import { App } from 'cdktf';

const app = new App();

new TestStack(app, 'test');
app.synth();
