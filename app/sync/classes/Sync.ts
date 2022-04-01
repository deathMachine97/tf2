import {DatabaseSingleton} from '../../db/classes/DatabaseSingleton';
import {Config} from "../../../sys/classes/Config";

export abstract class Sync {
    async sync() {
        const database = await DatabaseSingleton.getInstance();
        const data = await database.select('plan', {
            'user_id': Config.getInstance(),
        }, NaN);

        const result = {};
        data.forEach((eachPlan: Object) => {
            const year = eachPlan['year'];
            const month = eachPlan['month'];
            result[year] = result[year] ? result[year] : {};
            result[year][month] = result[year][month] ? result[year][month] : {};

            for (const eachKey in eachPlan) {
                result[year][month][eachKey] = eachPlan[eachKey];
            }
        });

        console.log(result);
    }
}