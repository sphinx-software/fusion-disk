const Storage = require('../storage');

class LocalStorage extends Storage {

    setDirectory(directory) {
        this.directory = directory;
        return this;
    }

    put() {
        throw new Error('not implemented');
    }

    get() {
        throw new Error('not implemented');
    }

    exists() {
        throw new Error('not implemented');
    }

    url() {
        throw new Error('not implemented');
    }
}

module.exports = LocalStorage;