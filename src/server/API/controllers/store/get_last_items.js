import keystone from 'keystone';

const StoreItem = keystone.list('StoreItem');

const getLastStoreItems = (cb) => {
    StoreItem.paginate({
        page: 1,
        perPage: 15,
        maxPages: 10
    }).populate('category').sort('-publishedDate').exec((err, results) => {
        if (err) {
            return cb({
                message: 'Internal server error',
                status: 500,
                success: false
            });
        }
        
        return cb(null, {
            data: results.results,
            status: 200,
            success: true
        });
    });
};

export default getLastStoreItems;