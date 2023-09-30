# nx-cdktf [![npm version](https://badge.fury.io/js/nx-cdktf.svg)](https://badge.fury.io/js/nx-cdktf)

## NX wrapper for Terraform CDK command-line tool for Typescript.

This plugin allows integrating Terraform CDK (aka [CDKTF](https://github.com/hashicorp/terraform-cdk)) into your existing [NX](https://nx.dev/) codebase. It makes it easier to manage your cloud infrastructure from the same monorepo as your application(s) codebase.

It provides:

- Project generator
- Stack generator (opinionated)
- General CDKTF executors
  - Synth
  - Deploy
  - Destroy
  - Provider
    - Add
    - Get
    - List
    - Upgrade

> Note: This plugin is just a wrapper for CDKTF for Typescript, therefore this documentation does not include any CDKTF specific instructions. <br/>
> For this plugin to work properly you need to have the CDKTF CLI set up locally. Follow the official [Getting Started Guide](https://developer.hashicorp.com/terraform/tutorials/cdktf/cdktf-install#prerequisites) (if you haven't already).

## Setting up the NX CDKTF plugin

Adding the CDKTF plugin to an existing Nx workspace can be done with the following:

```sh
npm i -D nx-cdktf
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

We can then call the following commands:

```bash
# executors
nx synth appName
nx deploy appName
nx destroy appName


nx run appName:add-provider google
nx run appName:get-providers
nx run appName:list-providers
nx run appName:upgrade-provider google
```

```bash
# generators
nx g nx-cdktf:stack CloudRun --project appName
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
