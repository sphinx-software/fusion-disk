class DiskManager {

    constructor() {
        this.storages = {};
    }

    /**
     *
     * @param {String} diskName
     * @param {Storage} Storage
     * @return {DiskManager}
     */
    register(diskName, Storage) {
        this.storages[name] = Storage;
        return this;
    }

    /**
     *
     * @param {String} diskName
     * @return {Storage}
     */
    disk(diskName) {
        return this.storages[diskName];
    }

}

module.exports = DiskManager;