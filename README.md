# Finance Agent App

A comprehensive React Native application for loan management with role-based access control for Admin and Dealer users.

## Features

### Authentication
- Phone/Email login with password
- OTP-based login
- Forgot password functionality
- Role-based authentication (Admin/Dealer)

### Admin Features
- **Dashboard**: Overview with stats and recent applications
- **Dealers Management**: Add, edit, suspend/activate dealers
- **Loan Applications**: Review, approve, or reject loan applications
- **Customers Management**: View customer profiles and loan history
- **Reports**: Analytics and reporting with charts
- **Profile**: Admin profile and company information

### Dealer Features
- **Dashboard**: Today's applications, approved loans, EMI tracking
- **New Loan**: Multi-step loan creation process
  - Step 1: Product details
  - Step 2: Loan details with EMI calculation
  - Step 3: Customer information
  - Step 4: KYC document upload
  - Step 5: Review and submit
- **Customers**: Customer management and profiles
- **Applications**: Track loan applications status
- **Profile**: Shop details and commission information

## Tech Stack

- **React Native** 0.84.1
- **TypeScript**
- **React Navigation** 6.x
- **React Native Vector Icons**
- **React Native Linear Gradient**
- **Async Storage** for session management

## Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React Context (Auth)
├── navigation/         # Navigation setup
│   ├── AppNavigator.tsx
│   ├── AuthNavigator.tsx
│   ├── AdminNavigator.tsx
│   └── DealerNavigator.tsx
├── screens/            # Screen components
│   ├── auth/          # Authentication screens
│   ├── admin/         # Admin-specific screens
│   └── dealer/        # Dealer-specific screens
├── theme/             # App theme and styling
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Step 1: Install Dependencies

```sh
npm install
```

### Step 2: Start Metro

```sh
npm start
```

### Step 3: Build and run your app

#### Android
```sh
npm run android
```

#### iOS
```sh
# Install CocoaPods dependencies first
cd ios && pod install && cd ..
npm run ios
```

## Demo Credentials

For testing purposes, use the following credentials:

### Admin Login
- **Phone**: 9876543210
- **Password**: password

### Dealer Login
- **Phone**: 9876543211
- **Password**: password

## Key Features Implemented

### Authentication System
- Secure login with role-based access
- Session persistence using AsyncStorage
- OTP verification flow
- Password reset functionality

### Role-Based Navigation
- Automatic navigation based on user role
- Separate navigation stacks for Admin and Dealer
- Protected routes and screens

### Admin Dashboard
- Real-time statistics cards
- Recent loan applications list
- Quick access to all admin features
- Modern UI with gradient headers

### Dealer Dashboard
- Today's applications and stats
- Quick action buttons
- Recent loans with EMI information
- Commission tracking

### Multi-Step Loan Creation
- 5-step guided process
- Real-time EMI calculation
- Document upload interface
- Form validation and review

### Modern UI/UX
- Card-based layouts
- Gradient headers
- Status badges with color coding
- Responsive design
- Consistent theming

## Environment Variables

Create a `.env` file in the root directory for any configuration:

```env
API_BASE_URL=https://your-api-url.com
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Troubleshooting

If you're having issues getting the app to run, see the [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

## Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.

# Finance_Apps
