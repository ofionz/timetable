<template>
  <select
    @change="changeCity()"
    v-model="currentCityID"
    class="filial cellBorder"
  >
    <option value disabled selected>Выберите город</option>
    <option v-for="(city, index) in cities" :key="index" :value="city.id">{{
      city.name
    }}</option>
  </select>
</template>

<script>
export default {
  name: 'TableSelector',
  props: {
    cities: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      currentCityID: ''
    };
  },
  methods: {
    changeCity() {
      this.$emit('change-city', this.currentCityID);
    }
  }
};
</script>

<style scoped>
.filial {
  width: 500px;
  margin: 0 auto 20px;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #0000003d;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
}
.cellBorder:focus {
  outline: #66c7e3ad auto 1px;
}
</style>
