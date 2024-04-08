# IDATT2105 Fullstack project - Frontend

## Table of contents
1. [Introduction](#1-introduction)
2. [Technologies used](#2-technologies-used)
3. [Recommended IDE Setup](#3-recommended-ide-setup)
4. [Project Structure](#4-project-structure)
5. [Documentation](#5-documentation)
   1. [Run test and see coverage](#51-run-test-and-see-coverage)
6. [Installation](#5-installation)
   1. [Install dependencies](#51-install-dependencies)
   2. [Compile and Hot-Reload for Development](#52-compile-and-hot-reload-for-development)
   3. [Compile and Minify for Production](#53-compile-and-minify-for-production)
7. [Contributors](#6-contributors)



## 1. Introduction

Welcome to Quizzebassen! 
This is the frontend for the voluntary fullstack project in the course IDATT2105.
We have developed a web application for creating and playing quizzes. Whether you are here to challenge your intellect,
create challenging quizzes or just have fun with trivia, you have come to the right place!

Check it out at (Click image):

[<img src="/src/assets/QBlogo.png">](https://quizzebassen.com/login)

## 2. Technologies used

* Vue 3 with JavaScript
* Vitetest

## 3. Recommended IDE Setup

While you can use any IDE you prefer, our team used [WebStorm](https://www.jetbrains.com/webstorm/) by JetBrains.
WebStorm comes with support for JavaScript and Vue.js, making it a suitable choice for developing Quizzebassen.

If you're using WebStorm:

- You are recommend to have the [Vue.js plugin](https://plugins.jetbrains.com/plugin/9442-vue-js) installed for full support.
- Take advantage of WebStorm's completion and error detection for JavaScript.

## 4. Project structure

Here follows a brief overview of the project structure:

- `src/assets`: Contains all the static files such as images and the main stylesheet required for the UI.
- `src/components`: Holds the reusable Vue components.
- `src/layouts`: Defines the layout components that structure the appearance of the application.
- `src/router`: Manages the routes, responsible for navigating users between different views.
- `src/stores`: Includes the Vuex store files for managing the application's global state.
- `src/utils`: Consists of utility functions and helpers that provide common functionalities across the application.
- `src/views`: Contains Vue page components for different parts of the app.
- `App.vue`: The root Vue component that integrates the entire application.
- `main.js`: The entry point that creates the Vue instance and mounts the app.

## 5. Documentation

### 5.1. Run test and see coverage

To run the tests and see the frontend test coverage, run the following command in the terminal:

```sh
yarn coverage
```

## 6. Installation

Before you can run the application, you need to install the required dependencies. 
You can do this by running the following commands in the terminal:

### 6.1. Install dependencies
Run the following command to install the required dependencies:
```sh
yarn
```

### 6.2. Compile and Hot-Reload for Development
Run the following command to start the development server:
```sh
yarn dev
```

### 6.3. Compile and Minify for Production
Run the following command to build the application for production:
```sh
yarn build
```

## 7. Contributors

This project was developed by: Birthe Emilie Christiansen, Håkon Rene Billingstad, Lotte Kristine Walla Aune and Vemund Ellingsson Røe.
