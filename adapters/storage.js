export default class Storage {

    /**
     *
     * @param {String} fileName
     * @param {ReadStream} content
     * @param {'public'|'private'} permission
     * @return {Promise<void>}
     */
    put(fileName, content, permission) {
        throw new Error('not implemented');
    }

    /**
     *
     * @param {String} fileName
     * @return {WriteStream}
     */
    createWriteStream(fileName) {
        throw new Error('not implemented');
    }

    /**
     *
     * @param {String} fileName
     * @return {Promise<void>}
     */
    get(fileName) {
        throw new Error('not implemented');
    }

    /**
     *
     * @param {String} fileName
     * @return {Promise<boolean>}
     */
    exists(fileName) {
        throw new Error('not implemented');
    }

    /**
     *
     * @param {String} fileName
     * @return {Promise<boolean>}
     */
    delete(fileName) {

    }

}
