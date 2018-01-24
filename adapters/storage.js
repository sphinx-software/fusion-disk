class Storage {

    /**
     *
     * @param {String} name
     * @param {ReadStream} content
     * @return {Promise<void>}
     */
    put(name, content) {
        throw new Error('not implemented');
    }

    get() {
        throw new Error('not implemented');
    }

    exists() {
        throw new Error('not implemented');
    }

    url() {
        throw new Error('not implemented');
    }
}

module.exports = Storage;
