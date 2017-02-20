import keystone from 'keystone';

const StoreItem = keystone.list('StoreItem');

const createItem = (params, cb) => {
    const name = params.name;
    const category = params.category;
    const price = parseInt(params.price);
    const currency = params.currency;
    const paymentOptions = params.paymentOptions;
    const certificate = params.certificate || false;
    const itemDescription = params.itemDescription;

    if (!(name && category && price && currency && paymentOptions && itemDescription)) {
        return cb({
            status: 400,
            message: 'Missing required parameters',
            success: false
        });
    }

    StoreItem.model.create({
        name,
        category,
        price,
        currency,
        paymentOptions,
        certificate,
        itemDescription
    }, (err, item) => {
        if (err) {
            return cb({
                status: 500,
                message: 'Internal server error',
                success: false,
            });
        }

        return cb(null, {
            data: item,
            status: 201,
            success: true
        });
    });
};

export default createItem;
