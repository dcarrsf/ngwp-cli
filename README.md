# ngwp-cli
Angular2+ CLI and starter files with Typescript, Sass, Karma, Jasmine, and Webpack 2 bundling.

## Overview
The ngwp CLI is designed to make Angular development with Webpack easy and fast. Use the CLI to generate a new project, then use generator commands to quickly add components, directives, pipes, models, services, and routes.

![Screenshot](/img/ngwp-cli.jpg)

## Installation
Clone the repo to your local drive and cd into the ngwp-cli directory. 
```
$ git clone https://github.com/dcarrsf/ngwp-cli.git
$ cd ngwp-cli
```
Install the CLI globally and locally. This approach will enable you to modify the template files as needed, while using the CLI across projects.

```
$ npm install -g
$ npm install
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
The *init* command responds with a series of questions, which are used to generate the config for the project. Notice that the last option enables you to add page routing and related starter files to the boilerplate.
```
$ ngwp init

? Project name: movie-player
? Project author: Jane Do
? Project description: A really cool media player built with Angular.
? Do you need page routing? Y/n Yes
```
Be sure to cd into the new directory before running further commands. 

```
$ cd movie-player
```
Run the npm install command to install dependencies.

```
$ npm install
```

### route [name]
The *route* command adds a component to the *./src/app/* folder. Use this option to create a new page route. 

```
$ ngwp route contact
```
After generating the component, be sure to add it to the *./src/app/app.routing.ts* file.

### component [name]
The *component* command adds a component to the *./src/app/shared/components/* folder. Use this option to create UI components that can be shared across routes. 

```
$ ngwp component header
```
After generating the component, be sure to add it to the *./src/app/app.module.ts* file, or another module.

### directive [name]
The *directive* command adds a directive to the *./src/app/shared/directives/* folder. Use this option to create custom directives to manipulat ethe DOM. 

```
$ ngwp directive iterate
```

### pipe [name]
The *pipe* command adds a pipe to the *./src/app/shared/pipes/* folder. Use this option to create custom filters. 

```
$ ngwp pipe uppercase
```

### model [name]
The *model* command adds a model to the *./src/app/shared/models/* folder. Use this option to create a simple model class with static typing and private encapsulated properties. 

```
$ ngwp model user
```

### service [name]
The *service* command adds a service to the *./src/app/shared/service* folder. Use this option to create utilities and reusable services for your components. 

```
$ ngwp service json
```
After generating the service, be sure to add it to the *./src/app/app.module.ts* file, or another module.
