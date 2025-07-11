# Billing Form Frontend - TypeScript

A billing form application built with TypeScript, featuring form validation and API integration.

## Features

- TypeScript-based form validation
- Real-time error handling
- API integration for form submission
- Responsive design
- Type-safe code with proper interfaces

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Compile TypeScript to JavaScript:
```bash
npm run build
```

3. Open the application:
```bash
npm start
```

### Development

For development with live reload:
```bash
npm run dev
```

For watching TypeScript changes:
```bash
npm run watch
```

## Project Structure

```
BillingForm-Frontend/
├── src/                # Source files
│   ├── index.html      # Main HTML file
│   ├── script.ts       # TypeScript source code
│   └── style.css       # CSS styles
├── tsconfig.json       # TypeScript configuration
├── package.json        # Project dependencies and scripts
├── dist/               # Compiled JavaScript output
│   └── script.js       # Compiled from script.ts
└── README.md           # This file
```

## TypeScript Features

- **Type Safety**: All form data is properly typed with interfaces
- **DOM Manipulation**: Type-safe DOM element selection and manipulation
- **Error Handling**: Proper error handling with TypeScript types
- **Async/Await**: Modern async/await syntax for API calls
- **Strict Mode**: Full TypeScript strict mode enabled

## Form Validation

The form validates:
- Full Name (required)
- Email (required, format validation)
- Address (required)
- Payment Method (required)

## API Integration

The form submits data to: `https://localhost:7188/api/Billing/submit`

Data structure:
```typescript
interface BillingFormData {
  FullName: string;
  Email: string;
  Address: string;
  PaymentMethod: string | null;
}
```

## Building for Production

To build the project for production:
```bash
npm run build
```

This will compile the TypeScript code to JavaScript in the `dist/` directory. 