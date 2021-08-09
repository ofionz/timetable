<template>
  <div id="time-table">
    <CitySelector
      v-if="!currentCityId"
      :cities="cities"
      @change-city="fetchData"
    />

    <DepartmentSelector
      v-else
      :departments="data.departments"
      @change-department="changeTable"
    />
    <ModalWindow :modal="modalWindowState" />
    <Loading v-if="isPreloaderActive" />
    <PivotTable
      v-if="isPivot && currentCityId"
      :departments="data.departments"
    />
    <DetailedTable
      ref="DetailedTable"
      v-if="!isPivot"
      :currentDepartmentName="currentDepartmentName"
      :data="data"
      @save-table="postData"
    ></DetailedTable>
  </div>
</template>
<script>
import ModalWindow from './components/ModalWindow.vue';
import Loading from './components/Loading.vue';
import PivotTable from './components/PivotTable.vue';
import DetailedTable from './components/DetailedTable';
import DepartmentSelector from './components/DepartmentSelector';
import CitySelector from './components/CitySelector';
import factoryHttp from './utils/factoryHttp';
import {
  GET_DEPARTMENTS_ENDPOINT,
  GET_CITIES_ENDPOINT,
  SAVE_DEPARTMENT_ENDPOINT
} from './constants/constants';

export default {
  name: 'App',
  components: {
    DetailedTable,
    ModalWindow,
    Loading,
    PivotTable,
    DepartmentSelector,
    CitySelector
  },
  data: function() {
    return {
      data: { departments: {} },
      currentCityId: '',
      cities: [{ name: '123', id: '' }],
      currentDepartmentName: '',
      isPreloaderActive: true,
      isPivot: true,
      modalWindowState: {
        isVisible: false,
        title: 'Error',
        text: '',
        errorText: ''
      }
    };
  },
  created: function() {
    this.fetchCities();
  },

  methods: {
    changeTable(currentDepartmentName) {
      this.isPivot = false;
      this.currentDepartmentName = currentDepartmentName;
    },
    async fetchCities() {
      const http = factoryHttp();
      const data = await http.get(GET_CITIES_ENDPOINT);
      this.isPreloaderActive = false;
      if (!data || data.departments === null || data.properties === null) {
        this.setModalWindow('Error', 'Ошибка получения данных от сервера');
        console.log(data);
        return;
      }
      this.cities = data;
    },
    async fetchData(cityId) {
      this.currentCityId = cityId;
      const http = factoryHttp();
      const data = await http.get(GET_DEPARTMENTS_ENDPOINT, { cityID: cityId });
      this.isPreloaderActive = false;
      if (!data || data.departments === null || data.properties === null) {
        this.setModalWindow('Error', 'Ошибка получения данных от сервера');
        console.log(data);
        return;
      }
      this.data = data;
    },
    async postData(currentDepartmentInfo) {
      this.isPreloaderActive = true;
      const http = factoryHttp();
      const response = await http.post(SAVE_DEPARTMENT_ENDPOINT, {
        name: this.currentDepartmentName,
        body: currentDepartmentInfo.table
      });
      if (response) {
        this.isPreloaderActive = false;
        //  currentDepartmentInfo.HIDE_BUTTONS = 'true';
        this.$refs.DetailedTable.$forceUpdate();
      } else {
        this.isPreloaderActive = false;
        this.setModalWindow('Error', 'Ошибка отправки данных на сервер');
      }
    },
    setModalWindow(title, text) {
      this.modalWindowState.isVisible = true;
      this.modalWindowState.title = title;
      this.modalWindowState.text = text;
    }
  }
};
</script>

<style lang="scss">
#time-table {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-top: 20px;
  font-family: 'Roboto', sans-serif;
}
@font-face {
  font-family: 'Roboto';
  src: url('./assets/fonts/Roboto-Regular.ttf') format('truetype');
  font-style: normal;
  font-weight: 400;
}
</style>
