import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Root from '../layouts/Root';
import Login from '../pages/Login';
import AvailableCars from '../pages/AvailableCars';
import MyCars from '../pages/MyCars';
import AddCar from '../pages/AddCar';
import MyBooking from '../pages/MyBooking';
import SignUp from '../pages/SignUp';
import CarDetails from '../pages/CarDetails';
import { publicApi } from '../api/publicApi';
import Error from '../components/common/Error';
import Loader from '../components/common/ui/Loader';
import PrivateRoute from '../components/Private/PrivateRoute';

// Helper function to handle loader errors
const handleLoaderError = (error) => {
  console.error('Loader error:', error);
  // Return default values to prevent hydration issues
  return [];
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => {
          try {
            return await publicApi.get('/cars?availability=available');
          } catch (error) {
            return handleLoaderError(error);
          }
        },
        hydrateFallbackElement: <Loader />,
      },
      {
        path: 'available-cars',
        element: <AvailableCars />,
        loader: async () => {
          try {
            return await publicApi.get('/cars');
          } catch (error) {
            return handleLoaderError(error);
          }
        },
        hydrateFallbackElement: <Loader />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'car-details/:id',
        element: <CarDetails />,
        loader: async ({ params }) => {
          try {
            return await publicApi.get(`/cars/${params.id}`);
          } catch (error) {
            console.error('Car details loader error:', error);
            throw new Error('Car not found');
          }
        },
        errorElement: <Error />,
        hydrateFallbackElement: <Loader />,
      },
      // Logged in users route
      // private routes
      {
        path: 'add-car',
        element: (
          <PrivateRoute>
            <AddCar />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-cars',
        element: (
          <PrivateRoute>
            <MyCars />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-booking',
        element: (
          <PrivateRoute>
            <MyBooking />
          </PrivateRoute>
        ),
      },
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
]);
