<template>
  <div class="calendar">
    <div class="panel">
      <div class="indicator">
        <span
          class="year"
          v-text="render.year"
        />
        <span
          class="divide"
          v-text="'年'"
        />
        <span
          class="month"
          v-text="render.month + 1"
        />
        <span
          class="divide"
          v-text="'月'"
        />
      </div>
      <div class="month-ctrl">
        <span
          class="to-prev"
          @click.prevent.stop="changeMonth(-1)"
          v-text="'<'"
        />
        <span
          class="to-today"
          @click.prevent.stop="reset"
          v-text="'今天'"
        />
        <span
          class="to-next"
          @click.prevent.stop="changeMonth(+1)"
          v-text="'>'"
        />
      </div>
    </div>
    <div class="body">
      <div class="week">
        <div
          v-for="(head, index) in heads"
          :key="index"
          class="cell"
        >
          <span
            class="day"
            v-text="head"
          />
        </div>
      </div>
      <div
        v-for="(week, wIndex) in weeks"
        :key="wIndex"
        class="week"
      >
        <div
          v-for="(d, dIndex) in week"
          :key="dIndex"
          class="cell"
          @click.prevent.stop="handleDateClick(d.ymd)"
        >
          <span
            class="day"
            :class="d.isToday ? 'today' : d.dateType"
            :data-date="d.ymd.join('/')"
            v-text="d.date"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  props: {
    attrs: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const config = this.makeConfig()
    const render = {
      year: config.year,
      month: config.month
    }
    const HEADS = ['日', '一', '二', '三', '四', '五', '六']
    this.heads = [...HEADS.slice(config.weekStartsOn), ...HEADS.slice(0, config.weekStartsOn)]
    return {
      config,
      render,
      weeks: []
    }
  },
  created () {
    this.weeks = this.updateCalendar(this.render.year, this.render.month, this.config.today, this.config.weekStartsOn)
  },
  methods: {
    makeConfig () {
      const year = new Date().getFullYear()
      const month = new Date().getMonth()
      const date = new Date().getDate()
      return {
        today: [year, month, date],
        year,
        month,
        weekStartsOn: 0,
        ...this.attrs
      }
    },
    changeMonth (monthDelta = 1) {
      const { year, month } = this.render
      const d = new Date(year, month)
      d.setMonth(month + monthDelta)
      this.renderCalendar(d.getFullYear(), d.getMonth())
    },
    reset () {
      this.renderCalendar(...this.config.today.slice(0, 2))
    },
    renderCalendar (year, month) {
      if (+year !== +this.render.year || +month !== +this.render.month) {
        this.render = { year: +year, month: +month }
        this.weeks = this.updateCalendar(+year, +month, this.config.today, this.config.weekStartsOn)
      }
    },
    updateCalendar (
      year = new Date().getFullYear(),
      month = new Date().getMonth(),
      today = [new Date().getFullYear(), new Date().getMonth(), new Date().getDate()],
      weekStartsOn = 0
    ) {
      // startOfWeek
      const startDate = new Date(year, month, 1);
      const day = startDate.getDay();
      const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
      startDate.setDate(startDate.getDate() - diff);
      const [rows, cols] = [6, 7];
      const length = rows * cols;
      return Array.from({ length })
        // create a list of dates
        .map((_, index) => {
          const d = new Date(startDate);
          const targetDate = new Date(d.setDate(d.getDate() + index));
          const [year, month, date] = [targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()]
          const ymd = [year, month, date]
          const { year: ry, month: rm } = this.render
          return {
            date,
            ymd,
            isToday: ymd.join() === today.join(),
            dateType: (year === ry && month === rm) ? 'present' : ((year > ry || (year === ry && month > rm)) ? 'future' : 'past')
          }
        })
        // fold the array into a matrix
        .reduce((matrix, current, index, days) => {
          return !(index % cols !== 0) ? [...matrix, days.slice(index, index + cols)] : matrix
        }, [])
    },
    handleDateClick ([y, m, d]) {
      this.$emit('change', { year: y, month: m+1, date: d })
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  user-select: none;
  position: relative;
  display: inline-block;
  max-width: 500px;
  min-width: 320px;
  padding: 14px;
  color: rgb(60, 64, 67);
}
.panel {
  cursor: default;
  width: 90%;
  margin: 0 auto;
  display: table;
  line-height: 40px;
  .indicator {
    display: table-cell;
    min-width: 77px;
    text-align: left;
  }
  .month-ctrl {
    display: table-cell;
    min-width: 77px;
    text-align: right;
    .to-prev, .to-today, .to-next {
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
    }
    .to-today {
      margin: 0 10px;
    }
  }
}
.body {
  display: table;
  table-layout: fixed;
  width: 100%;
  .week {
    display: table-row;
    text-align: center;
  }
  .cell {
    cursor: default;
    position: relative;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .day {
    display: inline-block;
    width: 40px;
    line-height: 40px;
  }
  .today {
    border-radius: 50%;
    color: rgb(24, 90, 188);
    background-color: rgb(210, 227, 252);
  }
  .present {
    color: rgb(60, 64, 67);
    background-color: rgb(255, 255, 255);
  }
  .future, .past {
    color: rgb(112, 117, 122);
    background-color: rgb(255, 255, 255);
  }
}
</style>
