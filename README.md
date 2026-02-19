# EcSa – Ecommerce Dashboard

EcSa is a modern e‑commerce admin dashboard application that provides an intuitive interface for managing products, categories, orders and inventory. Built using Next.js and Prisma, it offers a streamlined experience for store owners to monitor sales and update catalogue data efficiently.

## Features

- **Product management** – create, update and delete products with attributes such as price, description, and stock.
- **Inventory tracking** – monitor stock levels and receive low‑stock alerts.
- **Order overview** – view and manage customer orders, update statuses and track fulfillment.
- **Category organisation** – organise products by categories and tags for better browsing.
- **Responsive UI** – built with Tailwind CSS and React for smooth performance on desktop and mobile.
- **API and database** – implemented with Next.js API routes and Prisma ORM connected to a PostgreSQL database.
- **Dockerised environment** – includes Docker and docker‑compose files for easy local development.

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API routes, Prisma (ORM)
- **Database:** PostgreSQL (via Prisma)
- **DevOps:** Docker, Docker Compose

## Getting Started

### Prerequisites

- Node.js v16+
- PostgreSQL database (local or cloud)
- Docker and Docker Compose (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/Timelaying/EcSa.git
cd EcSa/ecsa

# Install dependencies
npm install

# Create a copy of the environment file
cp .env.example .env
# Configure your database URL and other environment variables in .env

# Generate Prisma client and run database migrations
npx prisma generate
npx prisma migrate dev

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`.

### Running with Docker

You can use Docker Compose to start the application and a Postgres container:

```bash
docker-compose up --build
```

## Tests

Add tests with Jest and React Testing Library for frontend, and use Prisma's in‑memory database for backend tests. Run all tests with:

```bash
npm test
```

## Roadmap

- Implement authentication and role‑based access control
- Add analytics dashboard with charts and KPIs
- Integrate payment processing and order fulfilment features
- Improve accessibility and add dark/light modes

## Contributing

Contributions are welcome! Please open an issue to discuss your ideas or report bugs. Fork the repo, make your changes on a feature branch, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
