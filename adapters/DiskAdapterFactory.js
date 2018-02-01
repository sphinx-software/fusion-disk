import Promise        from 'bluebird';
import GoogleCloudSDK from '@google-cloud/storage';
import AWS            from 'aws-sdk';
import S3WriteSteam   from 's3-write-stream';

import S3Storage          from './s3/S3Storage';
import GoogleCloudStorage from './googleCloud/GoogleCloudStorage';
import LocalStorage       from './local/LocalStorage';

export default class DiskAdapterFactory {

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
     * @return {Promise<{Storage}>}
     */
    makeFromConfig(configDisks) {
        return Promise.props(
            Object.keys(configDisks.disks).reduce((disk, currentValue) => {
                let config         = configDisks.disks[currentValue];
                disk[currentValue] = this.make(config.adapter, config);
                return disk;
            }, {})
        );
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
