# TemperatureMonitoring

Overview: Temperature Monitoring Dashboard
The app is an Angular 21 “Temperature Monitoring” dashboard that shows sensor data and live temperature readings.
Architecture
Routes and layout
Shell layout (ShellComponent): Header with a “Temperature Monitoring” title and nav links (Dashboard, Sensors, Settings).
Routes:
/dashboard – main dashboard (default)
/sensors – placeholder (“Coming soon”)
/settings – placeholder (“Coming soon”)
Core API layer
Models (models.ts):
Sensor: id, name, avgTempC, readingCount
DashboardMetrics: activeSensors, messagesPerMinute
ReadingPoint: ts (ISO string), tempC
TemperatureApiService:
getMetrics() → /metrics
listSensors() → /sensors
getLiveReadings(sensorId) → /sensors/:id/readings/live
API prefix interceptor: Adds /api to relative URLs (except those starting with http or /assets).
Mock backend
The app uses mock data instead of a real backend:
TemperatureApiMockService implements the same interface as TemperatureApiService.
Mock data:
10 sensors with IDs like sensor-000 … sensor-009
Metrics: 42 active sensors, 1284 messages per minute
Live readings: generated with sine waves and noise
Dashboard page
The main view includes:
Stat cards – KPI cards for:
Active sensors
Messages per minute
Sensors table – List of sensors with:
Sensor ID/name
Average temperature (°C)
Reading count
Clicking a row selects that sensor.
Live readings panel – For the selected sensor:
Dropdown to switch sensors
Line chart (Chart.js) of temperature over time
Recent data packets – last 5 readings with time and temperature
Data is polled every 2 seconds via getLiveReadings().
Error handling – Red banners when API calls fail, with a “Refresh Page” button.
UI components
Reusable components:
KpiCardComponent – labels and values
CardComponent – card wrapper
TableComponent – table layout with ThDirective, TdDirective, TrDirective
BadgeComponent, ButtonComponent – generic UI elements
Tech stack
Angular 21 with standalone components
Signals for local state
ng2-charts (Chart.js) for the temperature chart
Tailwind CSS for styling (slate theme)
RxJS for polling and HTTP
Summary
The app is a coding test for a temperature monitoring dashboard. It uses mock data to show how sensors would be listed, how metrics would be displayed, and how live temperature readings would be polled and charted. The Sensors and Settings pages are placeholders for future features.


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
