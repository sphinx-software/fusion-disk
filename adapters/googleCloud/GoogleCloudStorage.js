const Storage = require('../storage');

class GoogleCloudStorage extends Storage {

    constructor(storage) {
        super();
        this.storage = storage;
    }

    /**
     *
     * @param {String} bucketName
     * @return {GoogleCloudStorage}
     */
    setBucket(bucketName) {
        if (!bucketName) throw new Error('NameBucket not null');
        this.bucket = this.storage.bucket(bucketName);
        return this;
    }

    /**
     *
     * @param {ReadStream | String} data
     * @param {String} fileName
     * @return {Promise<*>}
     */
    put(data, fileName) {
        if (typeof data === 'string') return this.putAsString(data, fileName);
        return this.putAsStream(data, fileName);
    }

    /**
     *
     * @param {ReadStream} steam
     * @param {String} fileName
     * @return {Promise<*>}
     */
    putAsStream(steam, fileName) {
        let file = this.bucket.file(fileName);
        return new Promise((resolve, reject) => {
            steam.pipe(file.createWriteStream()).on(reject).on(resolve);
        });

    }

    /**
     *
     * @param {String} stringData
     * @param {String} fileName
     * @return {Promise}
     */
    putAsString(stringData, fileName) {
        return this.bucket.file(fileName).save(stringData);
    }

    get() {

    }

    exists() {

    }

    url() {

    }
}

module.exports = GoogleCloudStorage;