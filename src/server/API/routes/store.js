import checkAuth from '../helpers/check_auth';
import createItem from '../controllers/store/create_item';
import getCategories from '../controllers/store/get_categories';

const storeRoutes = (app) => {
    app.post('/API/store/item', checkAuth, (req, res, next) => {
        createItem(req.body, (err, data) => {
            if (err) {
                return next(err);
            }

            return res.status(data.status).send(data);
        });
    });
    
    app.get('/API/store/categories', checkAuth, (req, res, next) => {
        getCategories((err, data) => {
            if (err) {
                return next(err);
            }

            return res.status(data.status).send(data);
        });
    });
};

export default storeRoutes;
