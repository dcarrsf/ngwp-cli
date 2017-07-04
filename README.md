# ngwp-cli
Angular2+ CLI and starter files with Typescript, Sass, Karma, Jasmine, and Webpack 2 bundling.

## Overview
The ngwp CLI is designed to make Angular development with Webpack easy and fast. Use the CLI to generate a new project, then use generator commands to quickly add components, directives, pipes, models, services, and routes.

## Installation
First, clone the repo to your local drive. Then, cd into the ngwp-cli directory and install the CLI globally. This approach will enable you to modify the template files as needed, while using the CLI across projects.

```
$ git clone https://github.com/dcarrsf/ngwp-cli.git
$ cd ngwp-cli
$ npm install -g
```
Check the version to confirm the installation.

```
$ ngwp -V
```
Use the --help command to view your options.

```
$ ngwp --help
```

## Generators
The CLI includes commands that you'll use to generate parts of the project. You'll start with the *init* command which you'll use to generate the project structure.

### init
The *init* command responds with a series of questions, which are used to generate the config for the project.
```
$ ngwp init

? Project name: movie-player
? Project author: Jane Do
? Project description: A really cool media player built with Angular.
? Do you need page routing? Y/n Yes
```
*Notice that the last option enables you to add page routing and related starter files to the boilerplate.*

### component [name]
The *component* command adds a component to the app/shared/components folder. Use this option to create UI components that can be shared across routes. 

```
$ cd movie-player
$ ngwp component header
```
After generating the component, be sure to add it to the app.module.ts file, or another module.
