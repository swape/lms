<script>
  import {getDay, getLocaleDayName, getLocaleMonthName, getYear} from '../utils/date'
  export let date
</script>

<div class='border border-primary rounded-md flex-col text-center inline-flex w-24 overflow-hidden bg-base-100 text-base-content '>
  <div class='text-sm bg-primary text-primary-content px-3'>{getLocaleMonthName(date)}</div>
  <div class='text-sm pt-3'>{getLocaleDayName(date)}</div>
  <div class='text-3xl px-3 pb-3'>{getDay(date)}</div>
  <div class='text-sm bg-primary text-primary-content px-3'>{getYear(date)}</div>
</div>
