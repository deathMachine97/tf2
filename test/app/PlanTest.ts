import 'mocha';
import { assert, expect } from "chai"
import { Plan } from '../../app/classes/Plan'
import { Months } from '../../app/enums/Months'

import { Plan as PlanType } from '../../app/interfaces/Plan'


describe('PlanClass test', () => { // the tests container
	const testYear = '2020';

	it('Create Object', () => {
		const plan = new Plan();
		expect(plan).not.to.be.undefined;
	});


	it('Get the monthly plan', () => {
		const plan = new Plan();
		expect(plan.getMonthlyPlan(testYear, Months.January)).is.instanceof(Object);
	});


	const nonExistentYear = '234134123';
	it('Get the monthly plan for a non-existent year', () => {
		const plan = new Plan();
		expect(plan.getMonthlyPlan(nonExistentYear, Months.January)).is.instanceof(Object);
	});


	it('Get the amount of the monthly plan', () => {
		const plan = new Plan();
		expect(plan.getAmountOfTheMonthlyPlan(testYear, Months.January)).to.be.greaterThan(0);
	});

	it('Get the amount of the monthly plan for non-existent year', () => {
		const plan = new Plan();
		expect(plan.getAmountOfTheMonthlyPlan(nonExistentYear, Months.January)).is.equal(0)
	});


	it('Get the monthly plan categories', () => {
		const plan = new Plan();
		expect(plan.getMonthlyPlanCategories(testYear, Months.January)).instanceOf(Array);

	});
})
