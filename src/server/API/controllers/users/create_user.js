import keystone from 'keystone';

const User = keystone.list('User');

const createUser = (params, cb) => {
  const name = {
    first: params.name.first,
    last: params.name.last
  };
  const email = params.email;
  const password = params.password;

  if (!(name.first && name.last && email && password)) {
    return cb({
      status: 400,
      message: 'Missing required parameter',
      success: false
    });
  }

  const newUser = new User.model({
    name,
    email,
    password
  });

  User.model.find({
    email
  }, (err, user) => {
    if (err) {
      return cb({
        status: 500,
        message: 'Internal server error',
        success: false
      })
    } else if (user.length) {
      return cb({
        status: 400,
        message: 'Email already registered',
        success: false
      });
    }

    newUser.save((err) => {
      return cb(err, {
        status: 201,
        message: 'User successfuly created',
        success: true
      });
    });
  });
};

export default createUser;
