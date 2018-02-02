export default class Storage {

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
                on('error', (error) => reject(error)).
                on('finish', () => resolve()).
                end(stringData.toString());
        });
    }

    /**
     *
     * @param {String} fileName
     * @param {'public'|'private'} permission
     * @return {WriteStream}
     */
    createWriteStream(fileName, permission) {
        throw new Error('not implemented');
    }

    /**
     *
     * @param {String} fileName
     * @return {ReadableStream}
     */
    createReadStream(fileName) {
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
        throw new Error('not implemented');
    }

}
