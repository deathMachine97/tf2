import 'mocha';
import {expect} from "chai"
import {Month} from '../../app/helper/classes/Month'
import {Months} from '../../app/helper/enums/Months'


describe('MonthClass test', () => { // the tests container
    const testYear = '2021';
    const testMonth = Months.January;
    it('Create Object', () => {
        const month = new Month(testYear, testMonth);
        expect(month).not.to.be.undefined;
    });


    it('Get monthly plan', () => {
        const month = new Month(testYear, testMonth);
        expect(month.getPlan()).is.instanceof(Object);
    });


    it('Get moth number', () => {
        const month = new Month(testYear, testMonth);
        expect(month.getMonthNumber()).is.not.NaN;
    });


    it('Get moth year', () => {
        const month = new Month(testYear, testMonth);
        expect(month.getYearNumber()).is.not.NaN;
    });

    it('Get monthly expense', async () => {
        const month = new Month(testYear, testMonth);
        const expense = await month.getExpense();

        expect(expense).satisfies(function (value: Object[]) {
            if (value && value.length) {
                value.map((eachExpense: any) => {
                    const date = new Date(eachExpense['created']);
                    const expenseYear = date.getFullYear();
                    const expenseMonth = date.getUTCMonth() + 1;

                    return expenseYear == month.getYearNumber() && expenseMonth == month.getMonthNumber();
                });
            }
            return false;
        }, 'Must return at least one expense of certain month');
    });
})