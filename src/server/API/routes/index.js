// Import here your routes. DO NOT CREATE ROUTE FILES OUTSIDE THIS FOLDER
// import ... from ...
import userRoutes from './users';
import storeRoutes from './store';
import offerRoutes from './offers';

const apiRoutes = (app) => {
  // Use app here like you would in Express
  offerRoutes(app);
  userRoutes(app);
  storeRoutes(app);
};

export default apiRoutes;
