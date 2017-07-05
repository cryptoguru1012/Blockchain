# Keystone-React-Redux template for Thrifa MERN projects.

This package uses Webpack and Babel to run Keystone, React and Redux.

Don't forget to change names for the ones in your project!.

Pre-requisites:
MongoDB
Node(works best with v4,3)
NVM(incase you're running a different version of Node)

Works 
### How to use:
1. `npm install`.
2. `npm run dev`, `npm run front:dev` and `npm run wds`.

### Configuration
1. Set `MONGO_URI` in `config/vars.js` before running the package.

### Scripts

* `npm run build` Build client JS into build folder.
* `npm run wds` Webpack watchs for changes in your React files.
* `npm start` Production mode.
* `npm run dev` Run server. Dev mode.

### File upload server
* Running on an EC2 instance
* API to upload images to S3 
* API to convert uploaded videos to mp4 format, extract transcription and upload to S3

### Syscoin Core
* Running on an EC2 instance
* Currently running version 2.1.4 
* https://github.com/syscoin/syscoin2/releases

### Syscoin API
* Running on an EC2 instance
* Currenty running dev 1.0.2
* https://github.com/syscoin/syscoin-api/tree/dev_1.0.2