import { provider }       from '@sphinx-software/fusion/Fusion/Fusion';
import { Config }         from '@sphinx-software/fusion';
import DiskManager        from './DiskManager';
import DiskAdapterFactory from './adapters/DiskAdapterFactory';

@provider()
export default class DiskProvider {

    constructor(container, fusion) {
        this.container = container;
        this.fusion    = fusion;
    }

    register() {

        this.container.singleton(DiskManager, () => new DiskManager());
        this.container.singleton(DiskAdapterFactory, () => new DiskAdapterFactory());

    }

    async boot() {
        const config       = await this.container.make(Config);
        const diskManager  = await this.container.make(DiskManager);
        const disksFactory = await this.container.make(DiskAdapterFactory);
        diskManager.setDefault(config.default);

        const diskAdapters = await disksFactory.makeFromConfig(config.disk);

        for (let diskAdapter in diskAdapters) {
            diskManager.register(diskAdapter, diskAdapters[diskAdapter]);
        }

    }

}