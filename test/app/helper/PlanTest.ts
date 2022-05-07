import 'mocha';
import {assert, expect} from "chai"
import {Plan} from '../../../app/helper/classes/Plan'
import {Months} from '../../../app/helper/enums/Months'

describe('PlanClass test', () => { // the tests container
    const testYear = '2021';
    const testMonth = Months.January;

    it('Create Object', async () => {
        const plan = await Plan.getInstance();
        expect(plan).not.to.be.undefined;
    });


    it('Get the monthly plan', async () => {
        const plan = await Plan.getInstance();
        expect(plan.getMonthlyPlan(testYear, testMonth)).is.instanceof(Object);
    });


    const nonExistentYear = '234134123';
    it('Get the monthly plan for a non-existent year', async () => {
        const plan = await Plan.getInstance();
        expect(plan.getMonthlyPlan(nonExistentYear, testMonth)).is.instanceof(Object);
    });


    it('Get the amount of the monthly plan', async () => {
        const plan = await Plan.getInstance();
        expect(plan.getAmountOfTheMonthlyPlan(testYear, testMonth)).to.be.greaterThan(0);
    });

    it('Get the amount of the monthly plan for non-existent year', async () => {
        const plan = await Plan.getInstance();
        expect(plan.getAmountOfTheMonthlyPlan(nonExistentYear, testMonth)).is.equal(0)
    });


    it('Get the monthly plan categories', async () => {
        const plan = await Plan.getInstance();
        expect(plan.getMonthlyPlanCategories(testYear, testMonth)).instanceOf(Array);
    });
})
