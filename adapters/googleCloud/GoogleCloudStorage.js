import Storage from '../storage';

export default class GoogleCloudStorage extends Storage {

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
        if (!bucketName) throw new Error('BucketName not null');
        this.bucketName = bucketName;
        this.bucket     = this.storage.bucket(bucketName);
        return this;
    }

    /**
     *
     * @param {String} fileName
     * @param {String | buffer} stringData
     * @param {'public'| 'private'} permission
     * @return {Promise<*>}
     */
    put(fileName, stringData, permission) {
        return new Promise((resolve, reject) => {
            this.createWriteStream(fileName, permission).
                on('error', () => reject()).
                on('finish', () => resolve()).
                end(stringData);
        });
    }

    /**
     *
     * @param fileName
     * @param {'public'| 'private'} permission
     * @return {WritableStream}
     */
    createWriteStream(fileName, permission) {
        let file  = this.bucket.file(fileName);
        let steam = file.createWriteStream();
        steam.on('finish', () => this.setPermission(file, permission));
        return steam;
    }

    public(fileName) {
        return this.bucket.file(fileName).makePublic();
    }

    /**
     *
     * @param {String} fileName
     * @return {ReadableStream}
     */
    get(fileName) {
        return this.bucket.file(fileName).createReadStream();
    }

    /**
     *
     * @param {String} fileName
     * @return {Promise<boolean>}
     */
    async exists(fileName) {
        let [response] = await this.bucket.file(fileName).exists();
        return response;
    }

    /**
     *
     * @param {String} fileName
     * @return {string} url
     */
    url(fileName) {
        return `https://storage.googleapis.com/${this.bucketName}/${filename}`;
    }

    /**
     *
     * @param file
     * @param {'public'| 'private'} permission
     * @return {*}
     */
    setPermission(file, permission) {
        switch (permission) {
            case 'public':
                return file.makePublic();
            case 'private' :
                return file.makePrivate();
        }
    }

}
