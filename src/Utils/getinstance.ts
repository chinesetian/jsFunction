const remote = require('electron').remote;
const remoteConfig = remote.getGlobal('config');

class AppConfig {
    runtimeDir: string;
    platform: string;
    appVer: string;
    appDir: string;
    productName: string;
    dbSuffix: string;
    arch: string;
    dbDir: string;
    // tslint:disable-next-line:member-ordering
    static _instance: AppConfig;

    static getInstance() {
        if (!AppConfig._instance) {
            AppConfig._instance = new AppConfig();
        }
        return AppConfig._instance;
    }

    constructor() {
        this.runtimeDir = remoteConfig.runtimeDir;
        this.platform = remoteConfig.platform;
        this.appVer = remoteConfig.appVer;
        this.appDir = remoteConfig.appDir;
        this.productName = remoteConfig.productName;
        this.dbSuffix = '.db';
        this.arch = remoteConfig.arch;
        this.dbDir = remoteConfig.appDataDir + '/databases/';
    }
}

let appConfig = AppConfig.getInstance();

export default appConfig;