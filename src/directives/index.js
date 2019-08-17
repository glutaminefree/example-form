import Vue from 'vue';
import Inputmask from 'inputmask';

export default {
  init() {
    Vue.directive('mask', {
      bind: (el, data) => {
        const input = el.querySelector('input');

        if (input) {
          Inputmask({
            mask: data.value,
            showMaskOnHover: false,
            showMaskOnFocus: false,
          }).mask(input);
        }
      },
      unbind: (el) => {
        const input = el.querySelector('input');

        if (input) {
          input.inputmask.remove();
        }
      },
    });
  },
};
