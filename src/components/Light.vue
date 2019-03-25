<template>
  <div
    :style="newStyleObject"
    v-bind:class="{ blink_me: blinking }"
  >
    {{ active ? currentSeconds : null}}
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
          'background-color': this.color,
          'width': '80px',
          'height': '80px',
          'border-radius': '50%',
          'box-shadow': '0 0 3em ' + this.color,
        }
      }
    },
    computed: {
      newStyleObject() {
        return {
          ...this.styleObject,
          opacity: this.active ? '1' : '0.4',
          'box-shadow': this.active ? '0 0 3em ' + this.color : 'none',
        }
      },
      currentSeconds() {
        return this.seconds;
      },
    },
  }
</script>

<style scoped>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    margin: 25px 13px 0;
    font-weight: 700;
    user-select: none;
  }

  div:last-child {
    margin-bottom: 25px;
  }

  .blink_me {
    animation: blinker 0.95s linear infinite;
  }

  @keyframes blinker {
    50% {
      opacity: 0.1;
    }
  }
</style>