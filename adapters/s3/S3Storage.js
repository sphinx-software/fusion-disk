import Storage       from '../Storage';
import { promisify } from 'util';

export default class S3Storage extends Storage {

    constructor(s3, s3WriteSteam) {
        super();
        this.s3             = s3;
        this.s3WriteSteam   = s3WriteSteam;
        this.s3WaitFor      = promisify(s3.waitFor);
        this.s3DeleteObject = promisify(s3.deleteObject);
    }

    /**
     *
     * @param {string} bucketName
     * @return {S3Storage}
     */
    setBucket(bucketName) {
        if (!bucketName) throw new Error('E_DISK_S3: BucketName not null');
        this.bucketName = bucketName;
        return this;
    }

    /**
     *
     * @param {string} fileName
     * @param {'public'|'private'} permission
     * @return {WriteStream}
     */
    createWriteStream(fileName, permission) {
        return this.s3WriteSteam({
            Key: fileName, ACL: this.getPermission(permission)
        });
    }

    /**
     *
     * @param {string} fileName
     * @return {ReadableStream}
     */
    createReadStream(fileName) {
        return this.s3.getObject({
            Bucket: this.bucketName, Key: fileName
        }).createReadStream();
    }

    /**
     *
     * @param {string} fileName
     * @return {Promise<boolean>}
     */
    exists(fileName) {
        return this.s3WaitFor('objectExists', {
            Bucket: this.bucketName,
            Key   : fileName
        });
    }

    /**
     *
     * @param {string} fileName
     * @return {Promise<boolean>}
     */
    delete(fileName) {
        return this.s3DeleteObject({
            Bucket: this.bucketName,
            Key   : fileName
        });
    }

    /**
     *
     * @param {string} permission
     * @return {string}
     */
    getPermission(permission) {
        switch (permission) {
            case 'public':
                return 'public-read';
            case 'private' :
                return 'private';
        }
    }
}
