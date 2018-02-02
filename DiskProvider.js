import { provider }       from '@sphinx-software/fusion/Fusion/Fusion';
import { Config }         from '@sphinx-software/fusion';
import DiskManager        from './DiskManager';

@provider()
export default class DiskProvider {

    constructor(container, fusion) {
        this.container = container;
        this.fusion    = fusion;
    }

    register() {

        this.container.singleton(DiskManager, () => new DiskManager());

    }

    async boot() {
        const config      = await this.container.make(Config);
        const diskManager = await this.container.make(DiskManager);
        diskManager.setDefault(config.disk.default);

        diskManager.makeFromConfig(config.disk);

    }

}