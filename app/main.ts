import {Helper} from "./helper/classes/Helper";
import {DatabaseSingleton} from "./db/classes/DatabaseSingleton";

async function run() {
    const helper = new Helper();
    await helper.runCommand();
}

run();