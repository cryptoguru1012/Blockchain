import keystone from 'keystone';

const Category = keystone.list('Category');

const getCategories = (cb) => {
    Category.model.find({}, (err, categories) => {
        return cb(err, {
            data: categories,
            success: true,
            status: 200
        });
    });
};

export default getCategories;
