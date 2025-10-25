# Varga Datalab

Varga Organization Management Software
Copyright (c) 2020 Kent Bull

## Building and deploying
- `./deploy-ctrl.sh dkb && ./deploy-ctrl.sh dkp`
- On target server: `docker run -d -p 443:443 --name=vetiweb registry.veti.io:5000/io.veti/veti-web-angular-prod:latest`

## NGINX Setup
see [this](https://www.namecheap.com/support/knowledgebase/article.aspx/9419/33/installing-an-ssl-certificate-on-nginx) link on Namecheap instructions
## MdProAngularCli

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.5.

Run `npm install` to install all the dependencies.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

### Build

Run `ng build --base-href=/data-lab/ --prod` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Libraries Used

### Example app [ngrx/platform](https://github.com/ngrx/platform)

### [Favicon Generator](https://www.favicon-generator.org/)

### Prime NG Table
- Link: https://www.primefaces.org/primeng/#/table/export
