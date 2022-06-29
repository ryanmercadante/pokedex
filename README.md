# Pokedex

## Table of Contents

- [General Info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Inspiration](#inspiration)
- [Contact](#contact)

## General Info

Pokedex is my take on the pokedex from the Pokemon games. It is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It is easy to use and deployed to [vercel](https://vercel.com). Access it at [https://pokedex-liart.vercel.app/](https://pokedex-liart.vercel.app/)

![Pokedex Homepage](https://user-images.githubusercontent.com/44175581/119437938-1b867600-bced-11eb-94fd-7bebb966235d.png)

## Technologies

- [Next.js](https://nextjs.org/) - The React framework for production.
- [Apollo Client](https://www.apollographql.com/docs/react/) - A comprehensive state management library that enables you to manage both local and remote data with GraphQL.
- [Apollo Server Micro](https://www.apollographql.com/docs/apollo-server/) - An open-source, spec-compliant GraphQL server for building production-ready GraphQL API's.
- [Nexus](https://nexusjs.org/) - A code-first approach to developing GraphQL servers.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework to build any design, directly in your markup.
- [TypeScript](https://www.typescriptlang.org/) - An open-source language that builds on JavaScript by adding Types.
- [Node.js](https://nodejs.org/en/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.

## Setup

To run this project, install it locally using npm:

```
$ git clone https://github.com/ryanmercadante/pokedex.git
$ cd pokedex/
$ npm install
$ npm run dev
```

# Features

## Done

- List out every pokemon in the pokedex
- Search for specific pokemon with text search
- Sort pokemon list four different ways, such as A-Z or Lowest number to Highest
- Filter pokemon by type such as fire, dark, etc.
- Shows count of unique pokemon on the page at any given time
- Navigate to pokemon details page to see more information about a pokemon

## To Do:

- Add evolution chain to pokemon details page
- Add more filter options
- Add chart and animation for pokemon stats
- Enhance pokemon details page
- More test coverage
- Add custom favicon

## Inspiration

The basic styling was inspired and choice of Next.js was inspired by this [video](https://www.youtube.com/watch?v=LMRAEUPkFXI). I then expanded on this idea by creating a GraphQL service layer on top of the [Pokemon REST API](https://pokeapi.co/docs/v2), adding searching, sorting, and filtering.

## Contact

- [LinkedIn](https://www.linkedin.com/in/ryan-mercadante-11a035152/)
- [Github](https://www.github.com/ryanmercadante)
- [Twitter](https://twitter.com/ryanmerc7)
- [Email](mailto:ryan.a.mercadante@gmail.com)
