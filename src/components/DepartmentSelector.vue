<template>
  <select
    @change="changeDepartment()"
    v-model="currentDepartmentName"
    class="filial cellBorder"
  >
    <option value disabled selected>Выберите филиал</option>
    <option
      v-for="(department, index) in Object.keys(departments)"
      :key="index"
      >{{ department }}</option
    >
  </select>
</template>

<script>
export default {
  name: 'TableSelector',
  props: {
    departments: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      currentDepartmentName: ''
    };
  },
  methods: {
    changeDepartment() {
      this.$emit('change-department', this.currentDepartmentName);
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
