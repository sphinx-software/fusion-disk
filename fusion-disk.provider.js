const DiskProvider = require('./fusion-disk.provider');
const DiskManager  = require('./storage.manager');

exports.register = async (container) => {

    container.singleton('diskProvider', () => new DiskProvider());
    container.singleton('diskManager', () => new DiskManager());

};

exports.boot = async (container) => {
    
};
