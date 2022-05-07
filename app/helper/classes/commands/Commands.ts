import {Commands as CommandInterface} from '../../interfaces/commands/Commands';

export abstract class Commands implements CommandInterface {
    protected params: any;
    private result;
    private error;

    constructor(params) {
        this.params = params;
    }

    async run() {
        try {
            await this.init();
            this.result = await this.doStuff();
            return true;
        } catch (e) {
            this.error = e
            return false;
        }
    }

    abstract init(): Promise<void>

    abstract doStuff(): Promise<boolean>

    showResult() {
        console.log(this.result);
    }

    showError() {
        console.log(this.error.name + ': ' + this.error.message);
    }
}
