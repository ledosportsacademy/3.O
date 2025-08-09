# Ledo Sports Academy - Backend API

This is the backend API for the Ledo Sports Academy Management System. It provides endpoints for managing hero slides, activities, members, donations, expenses, experiences, weekly fees, gallery, and dashboard statistics.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

### Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret
```

5. Start the development server:

```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new admin (restricted)
- `POST /api/auth/login` - Login admin
- `GET /api/auth/current` - Get current admin (protected)

### Hero Slides

- `GET /api/hero-slides` - Get all hero slides
- `GET /api/hero-slides/:id` - Get a specific hero slide
- `POST /api/hero-slides` - Create a new hero slide
- `PUT /api/hero-slides/:id` - Update a hero slide
- `DELETE /api/hero-slides/:id` - Delete a hero slide

### Activities

- `GET /api/activities` - Get all activities
- `GET /api/activities/status/:status` - Get activities by status
- `GET /api/activities/:id` - Get a specific activity
- `POST /api/activities` - Create a new activity
- `PUT /api/activities/:id` - Update an activity
- `DELETE /api/activities/:id` - Delete an activity

### Members

- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get a specific member
- `GET /api/members/search/:query` - Search members
- `POST /api/members` - Create a new member
- `PUT /api/members/:id` - Update a member
- `DELETE /api/members/:id` - Delete a member

### Donations

- `GET /api/donations` - Get all donations
- `GET /api/donations/:id` - Get a specific donation
- `GET /api/donations/total` - Get total donations amount
- `POST /api/donations` - Create a new donation
- `PUT /api/donations/:id` - Update a donation
- `DELETE /api/donations/:id` - Delete a donation

### Expenses

- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/:id` - Get a specific expense
- `GET /api/expenses/category/:category` - Get expenses by category
- `GET /api/expenses/total` - Get total expenses amount
- `GET /api/expenses/stats/categories` - Get expense statistics by category
- `POST /api/expenses` - Create a new expense
- `PUT /api/expenses/:id` - Update an expense
- `DELETE /api/expenses/:id` - Delete an expense

### Experiences

- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get a specific experience
- `POST /api/experiences` - Create a new experience
- `PUT /api/experiences/:id` - Update an experience
- `DELETE /api/experiences/:id` - Delete an experience

### Weekly Fees

- `GET /api/weekly-fees` - Get all weekly fees
- `GET /api/weekly-fees/member/:memberId` - Get weekly fees for a specific member
- `GET /api/weekly-fees/stats` - Get fee collection statistics
- `POST /api/weekly-fees/payment` - Add a payment for a member
- `PUT /api/weekly-fees/payment/:id` - Update a payment
- `DELETE /api/weekly-fees/payment/:id` - Delete a payment

### Gallery

- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery/top-five` - Get top 5 gallery items
- `GET /api/gallery/album/:album` - Get gallery items by album
- `GET /api/gallery/:id` - Get a specific gallery item
- `POST /api/gallery` - Create a new gallery item
- `PUT /api/gallery/:id` - Update a gallery item
- `DELETE /api/gallery/:id` - Delete a gallery item
- `PUT /api/gallery/toggle-top-five/:id` - Toggle top five status
- `PUT /api/gallery/update-order` - Update top five order

### Dashboard

- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/expense-categories` - Get expense categories for chart
- `GET /api/dashboard/financial-chart` - Get financial data for chart
- `GET /api/dashboard/recent-activities` - Get recent activities for dashboard

## Authentication

Protected routes require a valid JWT token in the `x-auth-token` header. To obtain a token, use the login endpoint.

## Error Handling

All endpoints return appropriate HTTP status codes and error messages in case of failure.

## Models

- Admin
- HeroSlide
- Activity
- Member
- Donation
- Expense
- Experience
- WeeklyFee
- Gallery
- Dashboard

## License

This project is licensed under the MIT License.