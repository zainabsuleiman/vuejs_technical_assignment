import moment from "moment";

class DateFormatter {
    static default(date) {
        return moment(date)
    }
    static date_only(date) {
        return moment(date).format('dddd, MMMM Do YYYY')
    }
    static from_now(date) {
        return moment(date).fromNow()
    }
    static date_time(date){
        return `${moment(date).format('L')}  ${moment(date).format('LT')}`
    }
    static date_with_time(date){
        return moment(date).format('MMMM Do YYYY, HH:mm:ss');
    }
}

export default DateFormatter