import { Plan } from './Plan';
import { Months} from '../enums/Months'

export type MonthPlan = {
    [name in Months]: Plan;
};