export class DateUtil {
    static getCurrentMonth() {
        return new Date().getMonth() + 1;
    }


    static getCurrentYear() {
        return new Date().getFullYear();
    }

}