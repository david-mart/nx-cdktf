# NxPlugins 🇺🇦

# nx-cdktf

NX wrapper for [Terraform CDK](https://github.com/hashicorp/terraform-cdk) command-line tool for Typescript. It provides:

- Project generator
- Stack generator (opinionated)
- General CDKTF executors
  - Synth
  - Deploy
  - Destroy

## Setting up the NX CDKTF plugin

Adding the Prisma plugin to an existing Nx workspace can be done with the following:

```sh
npm i -D nx-cdktf
```

```sh
pnpm i -D nx-cdktf
```

```sh
yarn add -D nx-cdktf
```

## Using the CDKTF Plugin

### Configuring an application

It's straightforward to setup your application:

```bash
nx g nx-cdktf:init appName
```

By default, the application will be configured with:

- NX Configuration and main.ts file
- A set of targets and executors to invoke common CDKTF commands to manage your application. You can add more executors later.

We can then call `synth`, `deploy` and `destroy` the following commands:

```bash
nx synth appName
nx deploy appName
nx destroy appName
```

> Tip: You can change the location or rename your _cdktf.out_ folder, but it's best to leave it in the project root so you can run other CDKTF commands from the project folder.

## Package reference

Here is a list of all the executors and generators available from this package:

### Executors

- synth: Synthesizes Terraform code for the given app in a directory.
- deploy: Deploy the given stacks
- destroy: Destroy the given stacks

### Generators

- init: Setup a new CDKTF Project

<br/>
<br/>

---

### 🇺🇦 Slava Ukraine! 🇺🇦
