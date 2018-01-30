import fs            from 'fs';
import { promisify } from 'util';
import path          from 'path';
import Storage       from '../Storage';

export default class LocalStorage extends Storage {

    constructor() {
        super();
        this.fsExists = promisify(fs.exists);
        this.fsDelete = promisify(fs.unlink);
    }

    /**
     *
     * @param directory
     * @return {LocalStorage}
     */
    setDirectory(directory) {
        if (!directory) throw new Error('E_DIRK_LOCAL: config dir is not null');
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }
        this.directory = directory;
        return this;
    }

    /**
     *
     * @param {string} fileName
     * @return {WriteStream}
     */
    createWriteStream(fileName) {
        return fs.createWriteStream(path.join(this.directory, fileName));
    }

    /**
     *
     * @param {string} fileName
     * @return {ReadableStream}
     */
    get(fileName) {
        return fs.createReadStream(path.join(this.directory, fileName));
    }

    /**
     *
     * @param {string} fileName
     * @return {Promise<void>}
     */
    exists(fileName) {
        return this.fsExists(path.join(this.directory, fileName));
    }

    /**
     *
     * @param {string} fileName
     * @return {Promise<void>}
     */
    delete(fileName) {
        return this.fsDelete(path.join(this.directory, fileName));
    }
}
