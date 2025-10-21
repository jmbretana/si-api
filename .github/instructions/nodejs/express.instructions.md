```instructions
---
description: Guidelines for Express applications using Node.js and TypeScript
applyTo: src/**/*.js, src/**/*.ts
---

## Important Process Requirements

- Always use TypeScript with strict mode enabled
- Enable `experimentalDecorators` and `emitDecoratorMetadata` in tsconfig.json for dependency injection
- Import `reflect-metadata` at the top of main.ts
- Use Zod for schema validation and type inference
- Implement proper dependency injection using `tsyringe` or `inversify`
- Always validate request/response data with schemas
- Use correlation IDs for request tracing (generate with uuid)
- Configure environment-specific settings using dedicated config files
- ALWAYS present a detailed plan and wait for explicit approval before implementing any code changes
- Do not proceed with implementation until receiving confirmation from the user
- When presenting the plan, provide a step-by-step breakdown of all files to be created or modified
- Ask directly: "Do you approve this plan before I proceed with implementation?"

## Naming Conventions

### Files and Directories

- Use kebab-case for file names: `posts.example.controller.ts`
- Add descriptive suffixes: `.controller.ts`, `.service.ts`, `.middleware.ts`, `.routes.ts`
- Test files: `*.spec.ts` or `*.test.ts`
- Config files: `app.config.{env}.ts` format
- Place tests in `__tests__` directories within their respective modules

### Classes and Interfaces

- Use PascalCase for classes: `PostController`, `BaseHttpService`
- Use PascalCase for interfaces: `AppConfig`, `ValidationErrorDetail`
- Controllers: End with `Controller` (e.g., `HealthController`)
- Services: End with `Service` (e.g., `PostService`)
- Errors: End with `Error` (e.g., `ValidationError`)

### Variables and Methods

- Use camelCase for variables and methods: `getAllPosts`, `baseUrl`
- Use descriptive names: `createPost` instead of `create`
- Boolean variables: Use `is`, `has`, `can` prefixes when appropriate
- Constants: Use UPPER_SNAKE_CASE for module-level constants

### Schema and Type Names

- Zod schemas: End with `Schema` (e.g., `PostSchema`, `CreatePostSchema`)
- TypeScript types: Use inferred types from Zod schemas with `z.infer<typeof Schema>`
- Response schemas: Include HTTP method context (e.g., `postListResponseSchema`)

## Code Style

### Formatting

- Use 2 spaces for indentation
- Use semicolons at the end of statements
- Use single quotes for strings
- Trailing commas in objects and arrays
- Line length: Maximum 85 characters
- Use template literals for string interpolation

### Import Organization

- Group imports: external libraries first, then internal modules
- Use simple-import-sort ESLint plugin for automatic sorting
- Relative imports for local modules: `'../cross-cutting/config'`
- Absolute imports from node_modules: `'express'`

### Code Structure

- Use async/await instead of promises with .then()
- Destructure objects when accessing multiple properties
- Use optional chaining (`?.`) when appropriate
- Prefer const over let, avoid var
- Use arrow functions for short callbacks

## Project Structure

```
src/
├── main.ts                    # Application entry point
├── server.ts                  # Server configuration
├── app.ts                     # Express app setup
├── controllers/               # HTTP request handlers
│   ├── __tests__/            # Controller tests
│   └── *.controller.ts
├── routes/                    # Route definitions
│   ├── index.ts              # Route registration
│   └── *.routes.ts
├── services/                  # Business logic services
│   └── *.service.ts
├── middlewares/               # Custom middlewares
│   ├── index.ts              # Middleware registration
│   └── *.middleware.ts
├── schemas/                   # Request/response schemas
│   └── *.schemas.ts
├── types/                     # Type definitions
│   └── *.types.ts
├── interfaces/                # Interface definitions
│   └── *.ts
├── models/                    # Data models
│   └── *.model.ts
└── cross-cutting/             # Shared concerns
    ├── config/                # Configuration management
    ├── error-handling/        # Error classes and handling
    ├── logging/               # Logging configuration
    ├── communication/         # HTTP client services
    ├── caching/               # Cache strategies
    └── context/               # Request context management
```

### Organization Principles

- Keep cross-cutting concerns separated
- Place tests close to the code they test
- Use index.ts files for clean imports

## Documentation

### Code Comments

- Use JSDoc for public APIs and complex functions
- Explain "why" not "what" in comments
- Document configuration options and environment variables
- Include examples for complex schemas or services

### Repository Documentation

- Maintain a comprehensive README.md with setup instructions
- Document API endpoints using Swagger/OpenAPI integration
- Keep CHANGELOG.md updated using conventional commits
- Include environment variable documentation
- Provide Docker setup instructions

### API Documentation

- Use `swagger-ui-express` for API documentation
- Define comprehensive schemas for all endpoints
- Include response examples and error codes
- Use JSDoc or OpenAPI specifications

## Testing

### Test Structure

- Use Jest as the testing framework
- Use `ts-jest` or `@swc/jest` for TypeScript compilation
- Place tests in `__tests__` directories
- Use descriptive test names: `should respond with 200 OK`

### Test Patterns

```typescript
describe("FeatureName", () => {
  let app: Express;

  beforeAll(() => {
    app = createApp();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should perform expected behavior", async () => {
    // Arrange, Act, Assert pattern
  });
});
```

### Testing Guidelines

- Test controllers using `supertest` for HTTP testing
- Mock external dependencies using Jest mocks
- Use factory functions for test data creation
- Test both success and error scenarios
- Maintain test coverage thresholds (minimum 80% for branches, functions, lines, statements)

## Dependencies & Setup

### Package Management

- Use npm or yarn as package manager
- Pin dependency versions in package.json
- Separate devDependencies from dependencies
- Use `peerDependencies` for plugin development

### Key Dependencies

- **Runtime**: `express`, `zod`, `axios`, `tsyringe` or `inversify`
- **Middleware**: `cors`, `helmet`, `express-rate-limit`, `compression`
- **Development**: `typescript`, `jest`, `eslint`, `prettier`, `supertest`
- **Utilities**: `uuid`, `winston` or `pino`, `dotenv`

### Import/Export Patterns

- Use ES6 imports/exports
- Export classes and functions as named exports
- Use default exports for main module exports
- Re-export from index.ts files for clean imports

## Error Handling

### Error Architecture

- Extend `BaseError` for all custom errors
- Use specific error classes: `ValidationError`, `CommunicationError`, `ApiError`
- Include error codes and HTTP status codes
- Provide detailed error information for debugging

### Error Types

```typescript
// Custom error classes
export class ValidationError extends BaseError
export class CommunicationError extends BaseError
export class ApiError extends BaseError

// Error structure
interface Error {
  message: string;
  code: string;
  statusCode: number;
  validation?: any;
}
```

### Error Handling Patterns

- Use global error handler middleware
- Transform external errors (Axios, Zod) to internal error types
- Log errors with correlation IDs
- Return consistent error response format
- Hide internal error details in production

### Express Error Middleware

```typescript
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Error handling logic
});
```

## Monitoring

### Logging Strategy

- Use Winston or Pino logger for structured logging
- Include correlation IDs in all log entries
- Log request/response data selectively
- Use different log levels: debug, info, warn, error
- Configure log format and transports appropriately

### Log Structure

- Include timestamp, level, message, and correlation_id
- Add trace_id from incoming requests
- Log HTTP method, URL, and status codes
- Use structured logging with JSON format

### Observability

- Integrate New Relic or similar APM for application monitoring
- Enable monitoring only in dev/staging/production environments
- Configure proper error capturing and reporting
- Include performance metrics and traces

## Performance

### HTTP Client Optimization

- Use keep-alive agents for HTTP connections
- Configure connection pooling with appropriate libraries
- Implement request/response interceptors for common headers
- Use appropriate timeouts for external calls

### Caching Strategy

- Implement cache abstraction with multiple strategies (Redis, LRU)
- Use middleware for route-level caching
- Cache frequently accessed data
- Implement cache invalidation strategies

### General Performance

- Use async/await for non-blocking operations
- Implement connection pooling for databases
- Use streaming for large data processing
- Enable gzip compression with `compression` middleware
- Use clustering for multi-core utilization

## Design Patterns

### Dependency Injection

- Use `tsyringe` or `inversify` for DI container
- Mark services with `@injectable()` decorator
- Inject dependencies using constructor injection
- Register services in a central DI configuration

### Controller Pattern

```typescript
@injectable()
export class PostController {
  constructor(private postService: PostService) {}

  async getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await this.postService.getAll();
      res.json(posts);
    } catch (error) {
      next(error);
    }
  }
}
```

### Service Pattern

- Separate business logic from controllers
- Use base classes for common functionality
- Implement interfaces for service contracts
- Keep services focused on single responsibility

### Middleware Architecture

- Create reusable middleware for cross-cutting concerns
- Use middleware for authentication, validation, logging
- Implement error handling middleware
- Use router-level middleware for feature isolation

### Schema-First Development

- Define Zod schemas for all data structures
- Use `z.infer` for type generation
- Validate all input/output with schemas
- Create middleware for schema validation

## Express-Specific Guidance

### Application Setup

- Separate app creation from server startup
- Configure middleware in correct order
- Use Router for modular route organization
- Implement graceful shutdown handling

### Request/Response Handling

- Use typed request/response interfaces with generics
- Implement proper HTTP status codes
- Use response helpers for consistent formatting
- Handle request context with `express-http-context` or `cls-hooked`

### Middleware Patterns

```typescript
// Validation middleware
export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      next(new ValidationError(error));
    }
  };
};
```

### Router Organization

- Create separate router files for each resource
- Group related routes together
- Apply middleware at router level when appropriate
- Register all routers in a central routes file

### Configuration Management

- Use environment-specific configuration files
- Validate configuration with Zod schemas
- Load environment variables with `dotenv`
- Separate configuration from application logic

### Security Considerations

- Enable CORS with `cors` middleware
- Use `helmet` for security headers
- Implement rate limiting with `express-rate-limit`
- Validate and sanitize all inputs
- Use secure cookie settings with `cookie-parser`
- Implement CSRF protection when needed
- Use HTTPS in production
- Implement proper authentication/authorization

### Best Practices

- Always use `next()` in middleware chain
- Catch async errors with try-catch or async handlers
- Set appropriate HTTP headers
- Use compression for responses
- Implement request timeouts
- Log important application events
- Use environment variables for configuration
- Implement health check endpoints
- Version your API routes (e.g., `/api/v1`)

### Common Middleware Stack

```typescript
app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(correlationIdMiddleware);
app.use(requestLoggingMiddleware);
```

### Async Error Handling

```typescript
// Async handler wrapper
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
```

```
