import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Root from '../layouts/Root';
import Login from '../pages/Login';
import AvailableCars from '../pages/AvailableCars';
import MyCars from '../pages/MyCars';
import AddCar from '../pages/AddCar';
import MyBooking from '../pages/MyBooking';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'available-cars',
        Component: AvailableCars
      },
      {
        path: 'login',
        Component: Login,
      },
      // Logged in users route
      // private routes
      {
        path: 'add-car',
        Component: AddCar
      }, 
      {
        path: 'my-cars',
        Component: MyCars
      }, 
      {
        path: 'my-booking',
        Component: MyBooking
      }
    ],
  },
]);
