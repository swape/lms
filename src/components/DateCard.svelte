<script>
import {getDay, getLocaleDayName, getLocaleMonthName, getYear} from '../utils/date'
import {isOldDueDate} from '../utils/date.ts'

const {date} = $props()

function oldColor(date, isBorder = false) {
  if (isBorder) {
    return isOldDueDate(date) ? 'border-gray-400 opacity-80' : 'border-primary'
  }
  return isOldDueDate(date) ? 'bg-gray-700' : 'bg-primary'
}
</script>

<div
  class="{oldColor(
    date,
    true
  )} border rounded-md flex-col text-center inline-flex w-24 overflow-hidden bg-base-100 text-base-content min-w-[94px]">
  <div class="text-sm {oldColor(date)}  text-primary-content px-3">{getLocaleMonthName(date)}</div>
  <div class="text-sm pt-3">{getLocaleDayName(date)}</div>
  <div class="text-3xl px-3 pb-3">{getDay(date)}</div>
  <div class="text-sm {oldColor(date)}  text-primary-content px-3">{getYear(date)}</div>
</div>
