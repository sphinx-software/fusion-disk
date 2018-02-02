import S3Storage          from './adapters/s3/S3Storage';
import S3WriteSteam       from 's3-write-stream';
import GoogleCloudSDK     from '@google-cloud/storage/src/index';
import LocalStorage       from './adapters/local/LocalStorage';
import GoogleCloudStorage from './adapters/googleCloud/GoogleCloudStorage';
import AWS                from 'aws-sdk/index';

export default class DiskManager {

    constructor() {
        this.storages = {};
    }

    setDefault(nameDisk) {
        this.defaultDisk = nameDisk;
        return this;
    }

    /**
     *
     * @param {String} diskName
     * @param {Storage} Storage
     * @return {DiskManager}
     */
    register(diskName, Storage) {
        this.storages[diskName] = Storage;
        return this;
    }

    /**
     *
     * @param {String} diskName
     * @return {Storage}
     */
    disk(diskName = this.defaultDisk) {
        return this.storages[diskName];
    }

    /**
     *
     * @param name
     * @param config
     * @return {Storage}
     */
    make(name, config) {
        switch (name) {
            case 'local':
                return this.makeLocalAdapter(config);
            case 's3':
                return this.makeS3Adapter(config);
            case 'googleCloud':
                return this.makeGoogleCloudAdapter(config);
            default :
                throw new Error(`E_DISK: adapter [${name}] is not supported`);
        }
    }

    /**
     *
     * @param configDisks
     * @return {void}
     */
    makeFromConfig(configDisks) {
        Object.keys(configDisks.disks).map(async currentValue => {
            let config = configDisks.disks[currentValue];
            this.register(currentValue, await this.make(config.adapter, config));
        });
    }

    /**
     *
     * @param config
     * @return {S3Storage}
     */
    makeS3Adapter(config) {
        if (!config.accessKeyId || !config.secretAccessKey) throw new Error(
            'E_DIRK_S3: config credential is not null credential require accessKeyId && secretAccessKey');

        let s3 = new AWS.S3({
            apiVersion     : config.apiVersion,
            accessKeyId    : config.accessKeyId,
            secretAccessKey: config.secretAccessKey
        });

        let s3Writersteam = S3WriteSteam({
            apiVersion     : config.apiVersion,
            accessKeyId    : config.accessKeyId,
            secretAccessKey: config.secretAccessKey,
            Bucket         : config.bucket
        });

        return new S3Storage(s3, s3Writersteam).setBucket(config.bucket);
    }

    /**
     *
     * @param config
     * @return {GoogleCloudStorage}
     */
    makeGoogleCloudAdapter(config) {
        const googleCLoudSdk = config.keyFilename ? new GoogleCloudSDK({
            keyFilename: config.keyFilename
        }) : new GoogleCloudSDK();

        return new GoogleCloudStorage(googleCLoudSdk).setBucket(config.bucket);
    }

    /**
     *
     * @param config
     * @return {LocalStorage}
     */
    makeLocalAdapter(config) {
        return new LocalStorage().setDirectory(config.dir);
    }

}
