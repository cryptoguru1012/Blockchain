import checkAuth from '../helpers/check_auth';
import createItem from '../controllers/store/create_item';
import getCategories from '../controllers/store/get_categories';
import getLastStoreItems from '../controllers/store/get_last_items';

const storeRoutes = (app) => {
    app.post('/API/store/item', checkAuth, (req, res, next) => {
        req.body.productVideo = req.files.productVideo;
        req.body.userId = req.user._id;
        createItem(req.body, (err, data) => {
            if (err) {
                return next(err);
            }

            return res.status(data.status).send(data);
        });
    });
    
    app.get('/API/store/products', (req, res, next) => {
        getLastStoreItems((err, data) => {
            if (err) {
                return next(err);
            }

            res.status(data.status).send(data);
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
