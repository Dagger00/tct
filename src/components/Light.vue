<template>
  <div
    class="light"
    v-bind:class="classObject"
  >
    {{ active ? currentSeconds : null }}
  </div>
</template>

<script>
  export default {
    props: {
      active: {
        type: Boolean,
        'default': false,
      },
      color: {
        type: String,
        'default': 'red'
      },
      seconds: {
        type: Number,
        'default': 0,
      },
      blinking: {
        type: Boolean,
        'default': false,
      },
    },
    data() {
      return {
        styleObject: {
        }
      };
    },
    computed: {
      classObject() {
        return {
          active: this.active,
          blinking: this.blinking,
          [this.color]: true,
          disabled: !this.active,
        };
      },
      currentSeconds() {
        return this.seconds;
      },
    },
  };
</script>

<style scoped>
  .light {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    margin: 25px 13px 0;
    font-weight: 700;
    user-select: none;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    opacity: 0.4;
  }

  div:last-child {
    margin-bottom: 25px;
  }

  .red {
    background-color: red;
    box-shadow: 0 0 3em red;
  }

  .yellow {
    background-color: yellow;
    box-shadow: 0 0 3em yellow;
  }

  .green {
    background-color: #76FF03;
    box-shadow: 0 0 3em #76FF03;
  }

  .active {
    opacity: 1;
  }

  .disabled {
    box-shadow: none;
  }

  .blinking {
    animation: blinker 0.95s linear infinite;
  }

  @keyframes blinker {
    50% {
      opacity: 0.1;
    }
  }
</style>