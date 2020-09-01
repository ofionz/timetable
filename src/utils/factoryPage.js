import Vue from 'vue';
Vue.config.productionTip = false;

export default function factoryPage(element, component) {
  return new Vue({
    el: element,
    render: h => h(component)
  });
}
