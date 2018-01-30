import Storage from '../Storage';

export default class GoogleCloudStorage extends Storage {

    constructor(storage) {
        super();
        this.storage = storage;
    }

    /**
     *
     * @param {string} bucketName
     * @return {GoogleCloudStorage}
     */
    setBucket(bucketName) {
        if (!bucketName) throw new Error('E_DISK_GOOGLE_CLOUD: BucketName not null');
        this.bucketName = bucketName;
        this.bucket     = this.storage.bucket(bucketName);
        return this;
    }

    /**
     *
     * @param fileName
     * @param {'public'| 'private'} permission
     * @return {WritableStream}
     */
    createWriteStream(fileName, permission = 'private') {
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
     * @param {string} fileName
     * @return {ReadableStream}
     */
    get(fileName) {
        return this.bucket.file(fileName).createReadStream();
    }

    /**
     *
     * @param {string} fileName
     * @return {Promise<boolean>}
     */
    async exists(fileName) {
        let [response] = await this.bucket.file(fileName).exists();
        return response;
    }

    /**
     *
     * @param {string} fileName
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
