import moment from 'moment';

export function relativeTime(referencedTime) {
    return moment().calendar(referencedTime, {
        sameDay: 'HH:mm',
        lastDay: '[Yesterday] HH:mm',
        lastWeek: '[Last] dddd HH:mm',
        sameElse: 'DD/MM/YYYY HH:mm'
    });
}