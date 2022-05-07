import 'mocha';
import {assert, expect} from "chai"
import {DateUtil} from "../../../app/system/classes/DateUtil";


describe('PlanClass test', () => { // the tests container

    it('Expect current month', async () => {
        const month = DateUtil.getCurrentMonth();
        expect(month).is.satisfies((month: number) => {
            return month == new Date().getMonth() + 1;
        })
    });


    it('Expect current year', async () => {
        const month = DateUtil.getCurrentYear();
        expect(month).is.satisfies((month: number) => {
            return month == new Date().getFullYear();
        })
    });
})
