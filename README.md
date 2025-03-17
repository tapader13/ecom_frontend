# Ecomus

A modern e-commerce frontend built with Next.js, React, and Tailwind CSS. It features a shopping cart, product sorting and filtering, favorite items, and secure payments via Stripe.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Development](#development)

## Features

- 🛒 **Shopping Cart**: Add, remove, increase, decrease items, and clear the cart.
- ❤️ **Favorites**: Add or remove favorite items.
- 🔍 **Search**: Find products using search functionality.
- 📊 **Sorting & Filtering**:
  - Sort by price.
  - Filter by color, price, and size.
- 💳 **Stripe Integration**: Secure payment processing with Stripe.

## Installation

To get started, clone the repository and install dependencies:

```sh
git clone https://github.com/tapader13/ecom_frontend.git
cd ecommerce-frntend
npm install
```

## Usage

Start the development server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

Run the production server:

```sh
npm start
```

## Scripts

| Command         | Description                      |
|-----------------|----------------------------------|
| `npm run dev`   | Start the development server     |
| `npm run build` | Build the project for production |
| `npm start`     | Start the production server      |
| `npm run lint`  | Run ESLint for code quality      |

## Configuration

Environment Variables

Configure your `.env.local` file with the necessary API keys:

```ini
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_key
```

## Dependencies

Main Dependencies

```ini
    Next.js (14.2.11)
    React (18)
    Redux Toolkit for state management
    Stripe.js for payments
    Supabase for authentication and backend services
    Tailwind CSS for styling
    Framer Motion for animations
```

## Dev Dependencies

```ini
    ESLint for linting
    TypeScript for type safety
    PostCSS & Tailwind CSS for styling
```

## Live URL

🚀 The project is deployed and available at:  

🔗 **[Ecommerce Frontend](https://ecom-frontend-flax.vercel.app/)**
