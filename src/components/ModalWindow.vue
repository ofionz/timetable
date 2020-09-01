<template>
  <div v-if="modal.isVisible" class="modal__backdrop" role="dialog">
    <div class="modal" ref="modal">
      <header class="modal__header">
        <slot name="header">
          <h2>
            {{ modal.title }}
          </h2>
        </slot>
      </header>
      <button
        type="button"
        class="button_closeModalCross"
        @click="closeModal()"
        aria-label="Close modal"
      >
        x
      </button>

      <section class="modal__body">
        <slot name="body">
          <p>{{ modal.text }}</p>
        </slot>
      </section>

      <footer class="modal__footer">
        <slot name="footer">
          <button
            type="button"
            class="button button_modal button_closeModal"
            @click="closeModal()"
            aria-label="Close modal"
          >
            Закрыть
          </button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalWindow',
  props: {
    modal: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {};
  },
  methods: {
    showModal(title, text, errorText) {
      this.modal.text = text;
      this.modal.title = title;
      this.modal.isVisible = true;
    },
    closeModal() {
      this.modal.text = '';
      this.modal.title = '';
      this.modal.isVisible = false;
    }
  }
};
</script>

<style scoped>
.button {
  padding: 10px;
  background: #cf1616ba;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.5s;
  width: -moz-fit-content;
  width: fit-content;
}

.button_modal {
  width: fit-content;
  width: -moz-fit-content;
  margin: 0 auto;
  background: #676661;
}

.button_modal:hover {
  background: #4b4a46;
}

.button_closeModal {
  margin: 0 0 0 auto;
}

.button_closeModalCross {
  color: #7c7777;
  font-size: 20px;
  border: none;
  margin: 10px;
  padding: 5px 10px;
  background: transparent;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  outline: none;
}

.modal__backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 400px;
}

.modal__header,
.modal__footer {
  padding: 15px;
  display: flex;
}

.modal__header {
  color: #4aae9b;
  justify-content: space-between;
}

.modal__footer {
  justify-content: flex-end;
}

.modal__body {
  position: relative;
  padding: 0 50px;
}

.modal__body p {
  padding: 0;
  margin: 0 0 10px;
}

.modal__header,
.modal__body {
  margin-bottom: 10px;
}
</style>
