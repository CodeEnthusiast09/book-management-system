# Book Management System

A full-stack web application for managing a collection of books with authentication and authorization.

## 🚀 Tech Stack

### Backend
- **NestJS** - Node.js framework
- **GraphQL** with Apollo Server
- **TypeORM** - ORM for database operations
- **SQLite** - Lightweight database
- **Auth0** - Authentication & Authorization
- **TypeScript** - Type safety

### Frontend
- **React** (Create React App)
- **TypeScript**
- **Apollo Client** - GraphQL client
- **Auth0 React SDK** - Authentication
- **Chakra UI** - Component library
- **React Router** - Navigation

## 📋 Features

- ✅ Admin authentication via Auth0 (Sign up/Sign in)
- ✅ Protected GraphQL API (JWT-based authorization)
- ✅ CRUD operations for books (Create, Read, Update, Delete)
- ✅ Responsive UI with Chakra UI components
- ✅ Real-time data synchronization
- ✅ Form validation
- ✅ Toast notifications for user feedback
- ✅ Confirmation dialogs for destructive actions

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Auth0 account (free tier works)

### 1. Clone the Repository

```bash
git clone https://github.com/CodeEnthusiast09/book-management-system
cd book-management-system
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file and add your credentials.:

```bash
cp .env.example .env
```

Run database seed:

```bash
npm run seed
```

Start backend server:

```bash
npm run start:dev
```

Backend will run on `http://localhost:4000/graphql`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file and add your credentials.:

```bash
cp .env.example .env
```

Start frontend:

```bash
npm start
```

Frontend will run on `http://localhost:3000`

### 4. Auth0 Configuration

1. Create an **API** in Auth0:
   - Name: `Book Management API`
   - Identifier: `https://book-management-api.com`
   - Signing Algorithm: `RS256`

2. Create a **Single Page Application**:
   - Name: `Book Management Dashboard`
   - Allowed Callback URLs: `http://localhost:3000`
   - Allowed Logout URLs: `http://localhost:3000`
   - Allowed Web Origins: `http://localhost:3000`

## 🧪 Testing

### Backend (GraphQL Playground)

1. Visit `http://localhost:4000/graphql`
2. Get an access token from Auth0 dashboard (Applications → APIs → Your API → Test tab)
3. Add to HTTP Headers:
   ```json
   {
     "Authorization": "Bearer your_token_here"
   }
   ```
4. Test queries:

**Get all books:**
```graphql
query {
  books {
    id
    name
    description
    created_at
    updated_at
  }
}
```

**Create a book:**
```graphql
mutation {
  createBook(input: {
    name: "Test Book"
    description: "This is a test book"
  }) {
    id
    name
  }
}
```

### Frontend

1. Navigate to `http://localhost:3000`
2. Click "Sign In / Sign Up"
3. Create account or login via Auth0
4. Test CRUD operations:
   - View books table
   - Click "Add Book" to create
   - Click edit icon to update
   - Click delete icon to remove

## 📝 API Documentation

### GraphQL Schema

**Types:**
```graphql
type Book {
  id: ID!
  name: String!
  description: String!
  created_at: DateTime!
  updated_at: DateTime!
}
```

**Queries:**
```graphql
books: [Book!]!
book(id: ID!): Book!
```

**Mutations:**
```graphql
createBook(input: CreateBookInput!): Book!
updateBook(input: UpdateBookInput!): Book!
deleteBook(id: ID!): Boolean!
```

**Input Types:**
```graphql
input CreateBookInput {
  name: String!
  description: String!
}

input UpdateBookInput {
  id: ID!
  name: String
  description: String
}
```

### Update Auth0

Add production URLs to:
- Allowed Callback URLs
- Allowed Logout URLs
- Allowed Web Origins

## 🔐 Security Features

- JWT-based authentication via Auth0
- All GraphQL endpoints protected with guards
- Token validation on every request
- CORS enabled for specific origins only
- Input validation on all mutations

## 🎨 UI Features

- Clean, modern interface with Chakra UI
- Responsive design (mobile-friendly)
- Loading states and spinners
- Error handling with user-friendly messages
- Success/error toast notifications
- Confirmation dialogs for destructive actions

## 📄 License

MIT

## 👤 Author

O'Brien Taiwo

## 🙏 Acknowledgments

- NestJS documentation
- Auth0 documentation
- Chakra UI components
- Apollo GraphQL
