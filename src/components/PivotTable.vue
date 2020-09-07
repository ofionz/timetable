<template>
  <div>
    <div v-for="(department, index) in getDepartmentsNamesList()" :key="index">
      <h2>{{ department }}</h2>
      <div class="mainTable">
        <ul class="mainTable__header">
          <li>Группа</li>
          <li>Дата заполнения</li>
          <li>Начало обучения</li>
          <li>Дни занятий</li>
          <li>Время занятий</li>
        </ul>

        <ul
          v-for="(tableRow, index) in departments[department].table"
          :key="index"
          class="mainTable__row"
        >
          <li>{{ tableRow.GROUP }}</li>
          <li>{{ changeDateFormat(tableRow.DATE_UPDATE) }}</li>
          <li>{{ changeDateFormat(tableRow.BEGINNING_DATE) }}</li>
          <li>{{ tableRow.DAYS_OF_CLASSES_STRING }}</li>
          <li>{{ tableRow.LESSONS_TIME }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PivotTable',
  props: {
    departments: {
      type: Object,
      required: true
    }
  },
  methods: {
    changeDateFormat(str) {
      const date = str.split('-');
      return `${date[2]}.${date[1]}.${date[0]}`;
    },
    getDepartmentsNamesList() {
      const namesList = Object.keys(this.departments);
      for (let i = namesList.length - 1; i >= 0; i--) {
        if (this.departments[namesList[i]].table.length === 0) {
          namesList.splice(i, 1);
        }
      }
      return namesList;
    }
  }
};
</script>

<style scoped>
.mainTable {
  display: flex;
  flex-direction: column;
}
.mainTable__header {
  background: rgba(0, 0, 0, 0.15);
  color: rgba(0, 0, 0, 0.61);
  box-shadow: 0 5px 3px -1px rgba(0, 0, 0, 0.23);
  -webkit-box-shadow: 0 5px 3px -1px rgba(0, 0, 0, 0.23);
  -moz-box-shadow: 0 5px 3px -1px rgba(0, 0, 0, 0.23);
}
.mainTable__header li:last-child {
  margin: 0 auto 0;
}

.mainTable ul {
  padding: 10px;
  margin: 0;
  font-size: 13px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 1px 1px;
  grid-template-areas: '. . . . .';
}

.mainTable ul li {
  list-style-type: none;
}

.mainTable ul:not(:last-child) {
  border-bottom: 1px solid #c4c4c4;
}

.mainTable__header,
.mainTable__row {
  text-align: center;
}
.mainTable__row li:last-child {
  margin: 0 auto;
}
</style>
