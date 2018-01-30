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
    disk(diskName) {
        return this.storages[diskName];
    }

}
