const Storage = require('../storage');

class GoogleCloudStorage extends Storage {

    constructor(storage) {
        super();
        this.storage = storage;
    }

    setBucket(bucketName) {
        if (!bucketName) throw new Error('NameBucket not null');
        this.bucket = this.storage.bucket(bucketName);
        return this;
    }

    put(data, fileName) {
        return this[`putAs${typeof data}`];
    }

    putAsStream(steam, fileName) {

    }

    putAsString(string, fileName) {

    }

    get() {

    }

    exists() {

    }

    url() {

    }
}

module.exports = GoogleCloudStorage;