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

    /**
     *
     * @param {String} fileName
     * @param {String | buffer} stringData
     * @param {'public'| 'private'} permission
     * @return {Promise<*>}
     */
    put(fileName, stringData, permission) {
        return this.disk(this.defaultDisk).put(fileName, stringData, permission);
    }

    /**
     *
     * @param {String} fileName
     * @param {'public'|'private'} permission
     * @return {WriteStream}
     */
    createWriteStream(fileName, permission) {
        return this.disk(this.defaultDisk).createWriteStream(fileName, permission);
    }

    /**
     *
     * @param {String} fileName
     * @return {ReadableStream}
     */
    get(fileName) {
        return this.disk(this.defaultDisk).get(fileName);
    }

    /**
     *
     * @param {String} fileName
     * @return {Promise<boolean>}
     */
    exists(fileName) {
        return this.disk(this.defaultDisk).exists(fileName);
    }

    /**
     *
     * @param {String} fileName
     * @return {Promise<boolean>}
     */
    delete(fileName) {
        return this.disk(this.defaultDisk).delete(fileName);
    }

}
