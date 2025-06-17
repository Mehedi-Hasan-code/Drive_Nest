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
import { CloudLightning } from 'lucide-react';
import { privateApi } from '../api/privateApi';
import Error from '../components/common/Error';
import Loader from '../components/common/ui/Loader';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
        loader: async () => publicApi.get('/cars?availability=available'),
        hydrateFallbackElement: <Loader />
      },
      {
        path: 'available-cars',
        Component: AvailableCars,
        loader: async () => publicApi.get('/cars'),
        hydrateFallbackElement: <Loader />
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'signup',
        Component: SignUp,
      },
      {
        path: 'car-details/:id',
        Component: CarDetails,
        loader: async ({ params }) => publicApi.get(`/cars/${params.id}`),
        errorElement: <Error />,
        hydrateFallbackElement: <Loader />
      },
      // Logged in users route
      // private routes
      {
        path: 'add-car',
        Component: AddCar,
      },
      {
        path: 'my-cars',
        Component: MyCars,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const email = url.searchParams.get('email');
          return privateApi.get(`/my-cars?email=${email}`);
        },
        hydrateFallbackElement: <Loader />
      },
      {
        path: 'my-booking',
        Component: MyBooking,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const email = url.searchParams.get('email');
          return privateApi.get(`/bookings?email=${email}`);
        },
        hydrateFallbackElement: <Loader />
      },
    ],
  },
  {
    path: '*',
    Component: <Error />,
  },
]);
