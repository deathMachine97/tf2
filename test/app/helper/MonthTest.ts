import 'mocha';
import {expect} from "chai";
import {Month} from '../../../app/helper/classes/Month';
import {Months} from '../../../app/helper/enums/Months';
import {MongoDbUserId} from '../../../app/system/classes/MongoDbUserId';
import {Config} from "../../../sys/classes/Config";


describe('MonthClass test',  () => { // the tests container
    const testYear = '2021';
    const testMonth = Months.January;
    const dbUserId = new MongoDbUserId(Config.getInstance().get('user_id'));


    it('Create Object', () => {
        const month = new Month(testYear, testMonth, dbUserId);
        expect(month).not.to.be.undefined;
    });


    it('Get monthly plan', async () => {
        const month = new Month(testYear, testMonth, dbUserId);
        expect(month.getPlan()).is.instanceof(Object);
    });


    it('Get moth number', () => {
        const month = new Month(testYear, testMonth, dbUserId);
        expect(month.getMonthNumber()).is.not.NaN;
    });


    it('Get moth year', () => {
        const month = new Month(testYear, testMonth, dbUserId);
        expect(month.getYearNumber()).is.not.NaN;
    });


    it('Test Date Object', () => {
        const month = new Month(testYear, testMonth, dbUserId).toDate();
        expect(month).satisfies((dateObject: Date) => {
            const year = dateObject.getFullYear();
            const month = dateObject.getMonth();
            return parseInt(testMonth) - 1 == month
                && parseInt(testYear) == year;
        });
    });


    it('Test last date', () => {
        const lastDate = new Month(testYear, testMonth, dbUserId).getLastDate();

        expect(lastDate).satisfies((lastDate: Date) => {
            const year = lastDate.getFullYear();
            const month = lastDate.getMonth();
            const day = lastDate.getDate();

            return parseInt(testYear) == year
                && parseInt(testMonth) - 1 == month
                && day == 31;
        });
    });


    it('Test first date', () => {
        const firstDate = new Month(testYear, testMonth, dbUserId).getFirstDate();

        expect(firstDate).satisfies((firstDate: Date) => {
            const year = firstDate.getFullYear();
            const month = firstDate.getMonth();
            const day = firstDate.getDate();

            return parseInt(testYear) == year
                && parseInt(testMonth) - 1 == month
                && day == 1;
        });
    });

    it('Get monthly expense', async () => {
        const month = new Month(testYear, testMonth, dbUserId);
        const expense = await month.getExpense();

        expect(expense).satisfies(function (value: Object[]) {
            if (value && value.length) {
                const inappropriateExpenses = value.filter((eachExpense: any) => {
                    const expenseDate = new Date(eachExpense['created']);
                    return expenseDate.getFullYear() != month.toDate().getFullYear()
                        || expenseDate.getMonth() != month.toDate().getMonth();
                });
                return inappropriateExpenses.length == 0;
            }
            return false;
        }, 'Must return at least one expense of certain month');
    });


    it('Check monthly expense owner', async () => {
        const month = new Month(testYear, testMonth, dbUserId);
        const expense = await month.getExpense();

        expect(expense).satisfies(function (value: Object[]) {
            if (value && value.length) {
                const expensesOfWrongOwner = value.filter((eachExpense: any) => {
                    const user_id = eachExpense['user_id'];
                    return user_id != dbUserId.getId();
                });
                return expensesOfWrongOwner.length == 0;
            }
            return false;
        }, 'Must return at least one expense of certain month');
    });

})