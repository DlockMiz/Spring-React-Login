# Spring-React-Login

This is a spring boot java backend and react js frontend login template.

## Installation

Use npm to install node_modules for the react build.

```bash
npm install
```

## Usage Frontend
For webpack hot dev server:

```bash
npm start
```

For webpack production build:

```bash
npm build
```

## Usage Backend
This spring boot project is build using the gradle build system.

Inside of Intellij, run the application with the active spring profile _dev_.

## Local Database
If you have docker installed, go into the docker folder and run:
```bash
docker-compose up -d
```
This will install a local mysql instance that can be accessed using localhost:3306 
