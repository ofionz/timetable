<template>
  <div>
    <ul class="table__header">
      <li>{{ data.properties.GROUP.NAME }}</li>
      <li>{{ data.properties.BEGINNING_DATE.NAME }}</li>
      <li>{{ data.properties.DAYS_OF_CLASSES.NAME }}</li>
      <li>{{ data.properties.STATUS.NAME }}</li>
      <li>{{ data.properties.LESSONS_TIME.NAME }}</li>
    </ul>
    <ul
      class="table"
      v-for="(tableRow, index) in currentDepartmentInfo.table"
      :key="tableRow.ID"
    >
      <li>
        <select
          class="group cellBorder"
          :class="{ notValid: notValidForms['GROUP' + tableRow.ID] }"
          v-model="tableRow.GROUP"
        >
          <option
            v-for="(value, index) in data.properties.GROUP.VALUES"
            :value="value"
            :key="index"
            >{{ value }}</option
          >
        </select>
        <datepicker
          :input-class="'vdp-datepicker__field'"
          :wrapper-class="'cellBorder'"
          :language="ru"
          :format="'dd.MM.yyyy'"
          v-model="tableRow.BEGINNING_DATE"
          :class="{ notValid: notValidForms['BEGINNING_DATE' + tableRow.ID] }"
          :monday-first="true"
        ></datepicker>
        <div
          class="days cellBorder"
          :class="{ notValid: notValidForms['DAYS_OF_CLASSES' + tableRow.ID] }"
        >
          <div
            v-for="(value, index) in data.properties.DAYS_OF_CLASSES.VALUES"
            :key="index"
          >
            <label
              :class="
                tableRow.DAYS_OF_CLASSES.includes(value)
                  ? 'activeDaysValue'
                  : 'notActiveDaysValue'
              "
            >
              <input
                style="display: none"
                type="checkbox"
                :value="value"
                v-model="tableRow.DAYS_OF_CLASSES"
              />{{ value }}</label
            >
          </div>
        </div>
        <select
          v-model="tableRow.STATUS"
          :class="{ notValid: notValidForms['STATUS' + tableRow.ID] }"
          class="recruitment cellBorder"
        >
          <option
            v-for="(value, index) in data.properties.STATUS.VALUES"
            :value="value"
            :key="index"
            >{{ value }}</option
          >
        </select>
        <the-mask
          type="text"
          mask="HV:MV - HV:MV"
          :tokens="maskTokens"
          v-model="tableRow.LESSONS_TIME"
          :masked="true"
          :class="{ notValid: notValidForms['LESSONS_TIME' + tableRow.ID] }"
          class="time cellBorder"
        />
        <button type="button" class="button" @click="deleteTableRow(index)">
          Удалить
        </button>
      </li>
    </ul>
    <p v-if="currentDepartmentInfo.table.length == 0" class="emptyGroupList">
      В данном офисе группы отсутсвуют.
    </p>
    <div class="control">
      <button type="button" class="button button_add" @click="addNewTableRow">
        Добавить строку
      </button>
      <button type="button" class="button button_save" @click="saveTable">
        Сохранить данные
      </button>
    </div>
  </div></template
>

<script>
import { TheMask } from 'vue-the-mask';
import Datepicker from 'vuejs-datepicker';
import { ru } from 'vuejs-datepicker/dist/locale';

export default {
  name: 'DetailedTable',
  components: { TheMask, Datepicker },
  props: {
    data: {
      type: Object,
      required: true
    },
    currentDepartmentName: {
      type: String,
      required: true
    }
  },
  computed: {
    currentDepartmentInfo: function() {
      return this.data.departments[this.currentDepartmentName];
    }
  },
  data: function() {
    return {
      notValidForms: {},
      ru: ru,
      maskTokens: {
        H: {
          pattern: /[0-2]/
        },
        V: {
          pattern: /[0-9]/
        },

        M: {
          pattern: /[0-5]/
        }
      }
    };
  },
  methods: {
    saveTable() {
      if (this.isTableValid()) {
        this.$emit('save-table', this.currentDepartmentInfo);
      }
    },
    addNewTableRow() {
      this.currentDepartmentInfo.table.push({
        ID: -Date.now(),
        GROUP: '',
        BEGINNING_DATE: '',
        DAYS_OF_CLASSES: [],
        STATUS: '',
        LESSONS_TIME: ''
      });
    },
    deleteTableRow(index) {
      this.currentDepartmentInfo.table.splice(index, 1);
    },
    isTableValid() {
      this.notValidForms = {};
      let isValid = true;
      if (this.currentDepartmentInfo.table.length === 0) return isValid;
      for (let k = 0; k < this.currentDepartmentInfo.table.length; k++) {
        const tableRow = this.currentDepartmentInfo.table[k];
        if (!tableRow.GROUP) {
          isValid = false;
          this.$set(this.notValidForms, 'GROUP' + tableRow.ID, true);
        }
        if (!tableRow.BEGINNING_DATE) {
          isValid = false;
          this.$set(this.notValidForms, 'BEGINNING_DATE' + tableRow.ID, true);
        }
        if (tableRow.DAYS_OF_CLASSES.length === 0) {
          isValid = false;
          this.$set(this.notValidForms, 'DAYS_OF_CLASSES' + tableRow.ID, true);
        }
        if (!tableRow.STATUS) {
          isValid = false;
          this.$set(this.notValidForms, 'STATUS' + tableRow.ID, true);
        }
        if (
          tableRow.LESSONS_TIME.length !== 8 &&
          tableRow.LESSONS_TIME.length !== 13
        ) {
          isValid = false;
          this.$set(this.notValidForms, 'LESSONS_TIME' + tableRow.ID, true);
        }
      }
      return isValid;
    }
  }
};
</script>

<style>
input,
select {
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  width: inherit;
}
input:disabled {
  opacity: 0.7;
}
.table {
  padding: 0;
}
.table__header {
  background: rgba(0, 0, 0, 0.15);
  color: rgba(0, 0, 0, 0.61);
  box-shadow: 0 5px 3px -1px rgba(0, 0, 0, 0.23);
  -webkit-box-shadow: 0 5px 3px -1px rgba(0, 0, 0, 0.23);
  -moz-box-shadow: 0 5px 3px -1px rgba(0, 0, 0, 0.23);
  justify-items: center;
}
.table li {
  display: flex;
  align-items: flex-start;
  list-style-type: none;
}

.table li select,
.table li input {
  padding: 7px 10px;
  border: none;
  cursor: pointer;
}
.calendar__wrapper {
  width: 100%;
}
.cellBorder {
  padding: 2px;
  border-radius: 4px !important;
  border: 1px solid #0000003d !important;
}

.cellBorder:focus {
  outline: #66c7e3ad auto 1px;
}
.vdp-datepicker__field:focus {
  outline: none;
}
.table li,
.table__header {
  padding: 20px 0 20px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 20px;
  grid-template-areas: '. . . . .';
}

.table__header,
.table {
  margin-bottom: 20px;
}

.table__header li {
  list-style-type: none;
}

/*.days {*/
/*  margin-right: 10px;*/
/*  height: 65px;*/
/*}*/

.days {
  height: auto;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap: 4px 4px;
  font-size: 14px;
  padding: 5px;
  cursor: pointer;
}
.recruitment,
.group {
  width: 150px;
}

.notValid {
  border: 2px solid rgba(255, 0, 0, 0.61) !important;
  border-radius: 4px !important;
  animation-name: shakeNotValid;
  animation-duration: 0.6s;
  animation-timing-function: ease-in-out;
}

.button:focus {
  outline: none;
}

.button {
  padding: 8px 10px;
  background: #cf1616ba;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.5s;
  width: -moz-fit-content;
  width: fit-content;
  margin: 0 auto;
}

.button:hover {
  background: rgba(207, 22, 22, 0.88);
}

.button_add,
.button_save {
  margin: 0;
}

.button_add {
  background: rgba(1, 47, 207, 0.73);
  margin-right: 10px;
}

.button_add:hover {
  background: rgba(1, 47, 207, 0.84);
}

.button_save {
  background: rgba(3, 141, 15, 0.73);
}

.button_save:hover {
  background: rgba(3, 141, 15, 0.85);
}

.control {
  display: flex;
}

@keyframes shakeNotValid {
  0% {
    transform: translateX(0);
  }
  15% {
    transform: translateX(0.375rem);
  }
  30% {
    transform: translateX(-0.375rem);
  }
  45% {
    transform: translateX(0.375rem);
  }
  60% {
    transform: translateX(-0.375rem);
  }
  75% {
    transform: translateX(0.375rem);
  }
  90% {
    transform: translateX(-0.375rem);
  }
  100% {
    transform: translateX(0);
  }
}
.emptyGroupList {
  padding: 0 20px;
  margin: 0 0 30px;
}
.activeDaysValue {
  color: #f3f5f5;
  background: #1e90ff;
}
.notActiveDaysValue {
  opacity: 0.3;
  text-decoration-line: line-through;
}
.activeDaysValue,
.notActiveDaysValue {
  transition: 0.5s;
  padding: 0 5px;
  cursor: pointer;
}
</style>
