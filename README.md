# 21 MERN: Book Search Engine

![License](https://img.shields.io/badge/License-MIT-blue.svg)
<img alt="React" src="https://img.shields.io/badge/React-18+-blue.svg">
<img alt="GraphQL" src="https://img.shields.io/badge/GraphQL-16+-purple.svg">
<img alt="Apollo" src="https://img.shields.io/badge/Apollo-3.7+-blueviolet.svg">
<img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-4.4+-green.svg">
<img alt="Express" src="https://img.shields.io/badge/Express-4.17+-green.svg">
<img alt="Node.js" src="https://img.shields.io/badge/Node.js-16+-green.svg">

## Description

This project is a fully functioning Google Books API search engine that has been refactored from a RESTful API to a GraphQL API using Apollo Server. The application is built using the MERN stack (MongoDB, Express.js, React, and Node.js) and allows users to search for books, create an account, save book searches to their profile, and remove saved books. The refactoring demonstrates the benefits of GraphQL's more efficient data fetching compared to traditional RESTful approaches.

## Table of Contents

* Installation
* Usage
* Features
* GraphQL API
* Contributing
* License
* Questions

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/mern-book-search-engine.git

# Navigate to the project directory
cd mern-book-search-engine

# Install dependencies for server and client
npm install

# Build the application
npm run build

# Start the application
npm run dev
```

## Usage

Once the application is running, you can:

1. Search for books using the Google Books API
2. Create a user account or log in with existing credentials
3. Save books to your personal collection
4. View your saved books
5. Remove books from your saved collection

The application will be available at: http://localhost:3000

## Features

- **User Authentication**: Sign up, log in, and maintain a personalized book collection
- **Book Search**: Search the Google Books API database with real-time results
- **Responsive Design**: Optimized for both desktop and mobile experiences
- **Persistent Data**: MongoDB database stores user accounts and saved books
- **GraphQL API**: Efficient data fetching with a single endpoint
- **Apollo Client**: State management and caching for optimal performance

## GraphQL API

The application uses the following GraphQL operations:

### Queries:
- `me`: Returns the logged-in user's data including their saved books

### Mutations:
- `login`: Authenticates a user and returns a token
- `addUser`: Creates a new user account and returns a token
- `saveBook`: Saves a book to the user's account
- `removeBook`: Removes a book from the user's saved collection

## Contributing

Bradley Santiago

## License

This project is licensed under the MIT license.

## Questions

If you have any questions, please feel free to contact me at [BradleySantiago4@gmail.com](mailto:BradleySantiago4@gmail.com). You can also find more of my work at [https://github.com/revengelmfao](https://github.com/revengelmfao).
