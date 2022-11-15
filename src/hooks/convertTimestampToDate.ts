import dayjs from "dayjs";
import 'dayjs/locale/ru'
dayjs.locale('ru')

export function convertTimestampToDate(date:  Date | undefined ){
    return dayjs(date).format("MM-DD HH:mm:ss")
}