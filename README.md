# Temperature Monitoring

A Temperature Monitoring dashboard built with Angular 21 that displays sensor data and live temperature readings. It includes an Express backend that receives data from a temperature measurement process or a built-in simulator.

## Architecture

### Routes and Layout

- **Shell layout** (`ShellComponent`): Header with "Temperature Monitoring" title and nav links (Dashboard, Sensors, Settings)
- **Routes:**
  - `/dashboard` – main dashboard (default)
  - `/sensors` – placeholder ("Coming soon")
  - `/settings` – placeholder ("Coming soon")

### Core API Layer

**Models** (`models.ts`):
- `Sensor`: id, name, avgTempC, readingCount
- `DashboardMetrics`: activeSensors, messagesPerMinute
- `ReadingPoint`: ts (ISO string), tempC

**TemperatureApiService**:
- `getMetrics()` → `/api/metrics`
- `listSensors()` → `/api/sensors`
- `getLiveReadings(sensorId)` → `/api/sensors/:id/readings/live`

**API prefix interceptor**: Adds `/api` to relative URLs (except those starting with `http` or `/assets`).

### Backend Server

The app uses an Express server that provides real-time sensor data:

- **Endpoints:**
  - `GET /api/metrics` – active sensors count and messages per minute
  - `GET /api/sensors` – list of sensors with average temperature and reading count
  - `GET /api/sensors/:id/readings/live` – live temperature readings for a sensor

- **Data source:** The server spawns a `measure_temp` process. If that fails, it falls back to an internal simulator that generates temperature readings.

### Dashboard Page

The main view includes:

- **Stat cards** – KPI cards for:
  - Active sensors
  - Messages per minute
- **Sensors table** – List of sensors with:
  - Sensor ID/name
  - Average temperature (°C)
  - Reading count
  - Row click selects a sensor
- **Live readings panel** – For the selected sensor:
  - Dropdown to switch sensors
  - Line chart (Chart.js) of temperature over time
  - Recent data packets – last 5 readings with time and temperature
  - Data is polled every 2 seconds via `getLiveReadings()`
- **Error handling** – Red banners when API calls fail, with a "Refresh Page" button

### UI Components

Reusable components:
- `KpiCardComponent` – labels and values
- `CardComponent` – card wrapper
- `TableComponent` – table layout with `ThDirective`, `TdDirective`, `TrDirective`
- `BadgeComponent`, `ButtonComponent` – generic UI elements

### Tech Stack

- Angular 21 with standalone components
- Signals for local state
- ng2-charts (Chart.js) for the temperature chart
- Tailwind CSS for styling (slate theme)
- RxJS for polling and HTTP
- Express backend (Node.js)

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Running the Application

1. **Start the backend server** (from the project root):

   ```bash
   cd server && npm install && npm run dev
   ```

   The server runs at `http://localhost:3000`.

2. **Start the Angular development server** (in a separate terminal):

   ```bash
   npm install
   ng serve
   ```

3. Open your browser and navigate to `http://localhost:4200/`. The app proxies `/api` requests to the backend.

---

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.3.

## Development Server

To start the Angular development server:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running Unit Tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner:

```bash
ng test
```

## Running End-to-End Tests

For end-to-end (e2e) testing:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
