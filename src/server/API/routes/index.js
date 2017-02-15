// Import here your routes. DO NOT CREATE ROUTE FILES OUTSIDE THIS FOLDER
// import ... from ...
import userRoutes from './users';

const apiRoutes = (app) => {
	// Use app here like you would in Express
	userRoutes(app);
};

export default apiRoutes;
