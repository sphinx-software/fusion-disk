const S3Storage          = require('./s3/S3Storage');
const GoogleCloudStorage = require('./googleCloud/GoogleCloudStorage');
const LocalStorage       = require('./local/LocalStorage');

class DiskAdapterProvider {

    provide(name, config) {
        switch (name) {
            case 'local':
                return this.makeLocalAdapter(config);
            case 's3':
                return this.makeS3Adapter(config);
            case 'googleCloud':
                return this.makeGoogleCloudAdapter(config);
        }
    }

    makeS3Adapter(config) {
        return new S3Storage();
    }

    makeGoogleCloudAdapter(config) {
        return new GoogleCloudStorage();
    }

    makeLocalAdapter(config) {
        return new LocalStorage();
    }
}

module.exports = DiskAdapterProvider;
