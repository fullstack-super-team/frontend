# IDATT2105 Fullstack project - Frontend

## Table of contents
1. [Introduction](#1-introduction)
2. [Recommended IDE Setup](#2-recommended-ide-setup)
3. [Project Structure](#3-project-structure)
4. [Installation](#4-installation)
   - [Install dependencies](#install-dependencies)
   - [Compile and Hot-Reload for Development](#compile-and-hot-reload-for-development)
   - [Compile and Minify for Production](#compile-and-minify-for-production)
5. [Contributors](#6-contributors)



## 1. Introduction

Welcome to Quizzebassen! 
This is the frontend for the voluntary fullstack project in the course IDATT2105.
We have developed a web application for playing and creating quizzes. Whether you are here to challenge your intellect,
create challenging quizzes or just have fun with trivia, you have come to the right place!

### Thechnologies used

* Vue 3 with JavaScript
* Vitetest

## 2. Recommended IDE Setup

While you can use any IDE you prefer, our team used [WebStorm](https://www.jetbrains.com/webstorm/) by JetBrains.
WebStorm comes with support for JavaScript and Vue.js, making it a suitable choice for developing Quizzebassen.

If you're using WebStorm:

- Ensure you have the [Vue.js plugin](https://plugins.jetbrains.com/plugin/9442-vue-js) installed for full support.
- Take advantage of WebStorm's completion and error detection for JavaScript.

## 3. Project structure

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

## 4. Installation

Before you can run the application, you need to install the required dependencies. 
You can do this by running the following commands in the terminal:

### Install dependencies
Run the following command to install the required dependencies:
```sh
yarn
```

### Compile and Hot-Reload for Development
Run the following command to start the development server:
```sh
yarn dev
```

### Compile and Minify for Production
Run the following command to build the application for production:
```sh
yarn build
```

## 5. Contributors

This project was developed by: Birthe Emilie Christiansen, Håkon Rene Billingstad, Lotte Kristine Walla Aune and Vemund Ellingsson Røe.
