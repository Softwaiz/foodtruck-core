# 🚚 Food Truck Locator API

A realtime (not yet) API that lists foodtrucks around you.

## Features
- Real-time truck tracking with location updates
- Position based filters

## Tech Stack

| Component              | Technology              |
|------------------------|-------------------------|
| Framework              | Express                 |
| Database               | PostgreSQL              |
| Passwords Hashing      | Bcrypt                  |
| Authentication         | JWT Tokens              |
| API Testing            | ApiDog                  |

## Getting Started

### Prerequisites
- Docker + Docker Compose
- Node.js (Version used: 22.11.0)

### Installation
```bash

# Clone repository
git clone https://github.com/Softwaiz/foodtruck-core.git
cd foodtruck-core
# Install dependencies
yarn 

# Set environment variables
cp .env.example .env
# Edit .env with your database credentials.

# Initialize database and sync table with migration files
yarn prisma db push 

# Run development server
yarn start:dev
```


---

**Hungry for more?** Join on the CodeSanctum group on Telegram. https://kloo.me/codesanctum
