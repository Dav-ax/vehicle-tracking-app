# Vehicle Tracking System 🚗📍

A modern web application for real-time vehicle GPS tracking with an interactive map interface and vehicle management dashboard.

## Features ✨

- **Real-time GPS Tracking**: Monitor vehicle locations on Google Maps
- **Route Visualization**: Display vehicle travel routes with polylines
- **Vehicle Management**: Manage multiple vehicles linked to driver accounts
- **Advanced Search**: Find vehicles by plate, brand, model, or driver information
- **Responsive Design**: Fully responsive UI that works on desktop and tablet
- **Loading States**: Beautiful loading screens with skeleton animations
- **Error Handling**: Comprehensive error screens with retry functionality
- **Status Indicators**: Real-time vehicle status (active, inactive, offline, maintenance)
- **Battery Monitoring**: Track device battery levels
- **Speed Tracking**: Monitor real-time vehicle speed

## Tech Stack 🛠️

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Maps**: Google Maps API with @react-google-maps/api
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Package Manager**: npm/yarn

## Project Structure 📁

```
vehicle-tracking-app/
├── src/
│   ├── components/          # React components
│   │   ├── LoadingScreen.tsx     # Loading state with skeleton
│   │   ├── ErrorScreen.tsx       # Error state with retry
│   │   ├── MapSection.tsx        # Google Maps integration
│   │   ├── VehicleList.tsx       # Vehicle list with search
│   │   ├── VehicleCard.tsx       # Individual vehicle card
│   │   └── VehicleMarker.tsx     # Map marker with info window
│   ├── pages/
│   │   └── HomePage.tsx          # Main home page
│   ├── services/
│   │   └── vehicleService.ts     # Vehicle API service
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   ├── styles/
│   │   └── globals.css           # Global styles
│   ├── App.tsx                    # Main app component
│   └── main.tsx                   # React entry point
├── index.html               # HTML template
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config
├── tailwind.config.js       # Tailwind config
├── .env.example             # Environment variables example
└── README.md                # This file
```

## Getting Started 🚀

### Prerequisites

- Node.js 16+ and npm/yarn
- Google Maps API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dav-ax/vehicle-tracking-app.git
   cd vehicle-tracking-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Google Maps API Key:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

   Get your Google Maps API Key from:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable the Maps JavaScript API
   - Create an API key
   - Copy the key to `.env.local`

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will open at `http://localhost:3001`

## Development Commands 💻

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

## Application Flow 🔄

### User Flow

1. **Loading Screen** → App initializes with skeleton loader animation (2 segundos)
2. **Error Screen** (optional) → If initialization fails, shows error with retry button
3. **Home Page** → Main tracking interface with:
   - Left: Interactive Google Map with selected vehicle marker and route
   - Right: Selected vehicle details + searchable vehicle list

### Vehicle Selection

- Click any vehicle card in the right panel to select it
- Map updates to show selected vehicle location
- Route polyline displays on the map
- Info window appears on the marker with vehicle details

### Search Functionality

- Type in the search box to filter vehicles by:
  - Vehicle plate
  - Brand/Model
  - Driver name
  - Driver document

## Data Model 📊

### Vehicle

```typescript
interface DateRange {
  startDate: string; // "2025-07-12" (ISO timestamp o formato YYYY-MM-DD)
  endDate: string;   // "2026-07-12"
}

interface Vehicle {
  id: string;
  plate: string;                    // e.g., "ABC-123"
  model: string;                    // e.g., "Sprinter"
  brand: string;                    // e.g., "Mercedes-Benz"
  year: number;
  driver: Driver;
  currentLocation: GpsCoordinates;
  lastUpdate: string;               // ISO timestamp
  status: 'active' | 'inactive' | 'maintenance' | 'offline';
  batteryLevel?: number;            // 0-100
  speed?: number;                   // km/h
  route?: GpsCoordinates[];         // Polyline coordinates
  validityPeriod?: DateRange; 
}
```

### Driver

```typescript
interface Driver {
  id: string;
  name: string;
  document: string;                 // ID/Passport number
  phone?: string;
  email?: string;
}
```

## API Integration 🔌

Currently uses mock data from `vehicleService.ts`. To connect to a real API:

1. Update the `VITE_API_BASE_URL` in `.env.local`
2. Modify `vehicleService.ts` to call real endpoints
3. Expected API endpoints:
   - `GET /api/vehicles` - List all vehicles
   - `GET /api/vehicles/:id` - Get vehicle details
   - `GET /api/vehicles/:id/tracking` - Get vehicle tracking data
   - `PUT /api/vehicles/:id/location` - Update vehicle location

## Features en Detalle 🎯

### Pantalla de Carga (Loading Screen)
- Animación de logo giratoria
- Skeleton loader para mapa y lista
- Puntos animados con efecto de pulso
- Mensaje de estado
- Duración: 2 segundos

### Pantalla de Error (Error Screen)
- Icono de alerta animado
- Mensaje de error claro
- Botón "Reintentar" principal
- Opción "Recargar página" secundaria
- Código de error único

### Pantalla Principal (Home Page)
- **Sección Izquierda (70%)**: Google Map interactivo
  - Marcadores de todos los vehículos
  - Polyline de ruta del vehículo seleccionado
  - Info window con detalles
  - Controles de zoom y tipo de mapa
  
- **Sección Derecha (30%)**: Panel de vehículos
  - Tarjeta del vehículo seleccionado
  - Buscador en tiempo real
  - Lista de otros vehículos
  - Información del conductor
  - Estadísticas (velocidad, batería)

## Customization 🎨

### Colors

Edit `tailwind.config.js` to customize the color scheme:
- Primary: Sky blue (#0284c7)
- Danger: Red (#dc2626)
- Success: Green (#22c55e)
- Neutral: Gray palette

### Map Settings

Modify `MapSection.tsx` to customize Google Maps:
- Default zoom level
- Map type controls
- Street view
- Polyline colors and thickness

### Loading & Error Screens

Customize the animations and messages in:
- `LoadingScreen.tsx`
- `ErrorScreen.tsx`

## Browser Support 🌐

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations ⚡

- Lazy loading of Google Maps
- Memoized search filtering
- Optimized re-renders with React.memo
- CSS animations for smooth transitions
- Responsive design for all screen sizes

## Mock Data 📊

El proyecto incluye 5 vehículos de demostración:

1. **ABC-123** - Mercedes-Benz Sprinter 2022
   - Conductor: Juan García López
   - Estado: Activo
   - Batería: 95%
   - Velocidad: 45 km/h

2. **XYZ-789** - Mercedes-Benz Vito 2023
   - Conductor: María Rodríguez Martín
   - Estado: Activo
   - Batería: 78%
   - Velocidad: 52 km/h

3. **DEF-456** - Volkswagen Transporter 2021
   - Conductor: Carlos López Fernández
   - Estado: Inactivo
   - Batería: 35%
   - Velocidad: 0 km/h

4. **GHI-012** - Nissan ProMaster 2022
   - Conductor: Ana Sánchez García
   - Estado: Activo
   - Batería: 88%
   - Velocidad: 38 km/h

5. **JKL-345** - Fiat Ducato 2020
   - Conductor: Roberto Martín Pérez
   - Estado: Offline
   - Batería: 12%
   - Velocidad: 0 km/h

## Troubleshooting 🔧

### Google Maps not loading

- Verify API key is correctly set in `.env.local`
- Check if Maps JavaScript API is enabled in Google Cloud Console
- Ensure API key has no IP restrictions if testing locally

### Build errors

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf dist .vite`
- Ensure TypeScript version is up to date

### Performance issues

- Check browser dev tools for performance bottlenecks
- Verify Google Maps API quota usage
- Optimize image assets if using custom markers

## Future Enhancements 🎯

- [ ] Real-time location updates via WebSocket
- [ ] Advanced filtering and sorting options
- [ ] Vehicle history and analytics
- [ ] Geofencing alerts
- [ ] Route optimization
- [ ] Mobile app version
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Export reports (PDF/CSV)
- [ ] Vehicle maintenance tracker

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Support 💬

For issues and questions:
- GitHub Issues: [vehicle-tracking-app/issues](https://github.com/Dav-ax/vehicle-tracking-app/issues)
- Email: support@example.com

## Author 👤

**David Rivera**
- GitHub: [@Dav-ax](https://github.com/Dav-ax)

---

**Made with ❤️ for vehicle tracking excellence**
