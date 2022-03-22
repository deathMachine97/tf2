import 'mocha';
import { expect } from "chai"
import { Month } from '../../app/classes/Month'
import { Months } from '../../app/enums/Months'



describe('MonthClass test', () => { // the tests container
	const testYear = '2020';
	const testMonth = Months.January;
	it('Create Object', () => {
		const month = new Month(testYear, testMonth);
		expect(month).not.to.be.undefined;
	});


	it('Get monthly plan', () => {
		const month = new Month(testYear, testMonth);
		expect(month.getPlan()).is.instanceof(Object);
	});
})