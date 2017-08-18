// Import here your routes. DO NOT CREATE ROUTE FILES OUTSIDE THIS FOLDER
// import ... from ...
import userRoutes from './users';
import storeRoutes from './store';

const apiRoutes = (app) => {
  // Use app here like you would in Express
  userRoutes(app);
  storeRoutes(app);
};

export default apiRoutes;
