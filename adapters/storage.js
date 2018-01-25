class Storage {

    /**
     *
     * @param {String} visibility
     * @return {Storage}
     */
    setVisibility(visibility) {
        if (!['public', 'private'].includes(visibility)) {
            throw new Error(
                `Storage visibility is only support ["public", "private"] not support [${visibility}]`);
        }

        this.visibility = visibility;
        return this;
    }

    /**
     *
     * @param {function} callback
     * @return {Storage}
     */
    setDestination(callback) {
        this.setCallBackDestination = callback;
        return this;
    };

    /**
     *
     * @param file
     * @return {String}
     */
    getDestination(file) {
        return this.setCallBackDestination(file);
    }

    /**
     *
     * @param {function} callback
     * @return {Storage}
     */
    setFileName(callback) {
        this.setCallBackFileName = callback;
        return this;
    }

    /**
     *
     * @param file
     * @return {String}
     */
    getFileName(file) {
        return this.setCallBackFileName(file);
    }

    /**
     *
     * @param {String} name
     * @param {ReadStream} content
     * @return {Promise<void>}
     */
    put(name, content) {
        throw new Error('not implemented');
    }

    /**
     *
     * @param {String} name
     * @return {Promise<void>}
     */
    get(name) {
        throw new Error('not implemented');
    }

    /**
     *
     * @param {String} name
     * @return {Promise<boolean>}
     */
    async exists(name) {
        throw new Error('not implemented');
    }

    /**
     *
     * @param {String} name
     * @return {Promise<String>}
     */
    url(name) {
        throw new Error('not implemented');
    }

    async _handleFile(req, file, cb) {
        await this.put(this.getFileName(file), file.stream);
    }
}

module.exports = Storage;
