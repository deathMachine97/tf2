import {config as SysConfig} from '../config';
import {main_config} from '../../main_config';

export class Config {
    private static instance: Config;
    private config: { [index: string]: any };

    static getInstance() {
        if (Config.instance) {
            return Config.instance;
        } else {
            return new Config();
        }
    }

    private constructor() {
        this.config = {};
        this.initValues();
    }

    private initValues() {
        for (const configKey in SysConfig) {
            this.config[configKey] = SysConfig[configKey]
        }

        for (const configKey in main_config) {
            this.config[configKey] = main_config[configKey];
        }
    }

    public get(configKey: string) {
        const configValue = this.config[configKey];
        return configValue ? configValue : null;

    }
}