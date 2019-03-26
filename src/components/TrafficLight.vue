<template>
  <div>
    <light
      v-for="item in lights"
      :key="item.color"
      :active="item.active"
      :color="item.color"
      :seconds="currentSeconds"
      :blinking="item.blinking"
    />
  </div>
</template>

<script>
  import light from './Light.vue';

  export default {
    components: {
      light
    },
    props: {
      seconds: {
        type: Number,
        'default': 3,
      },
    },
    data: function () {
      return {
        timerSeconds: 0,
        lights: [
          {
            active: false,
            color: 'red',
            blinking: false,
          },
          {
            active: false,
            color: 'yellow',
            blinking: false,
          },
          {
            active: false,
            color: 'green',
            blinking: false,
          },
        ],
        transitions: {
          red() {
            const {yellowAfterRed} = this.transitions;
            this.makeTransition(yellowAfterRed, 2);
          },
          yellowAfterRed() {
            const {green} = this.transitions;
            this.makeTransition(green, 3);
          },
          yellowAfterGreen() {
            const {red} = this.transitions;
            this.makeTransition(red, 1);
          },
          green() {
            const {yellowAfterGreen} = this.transitions;
            this.makeTransition(yellowAfterGreen, 2);
          },
        },
        updateState() {}
      };
    },
    computed: {
      currentSeconds() {
        return this.seconds - this.timerSeconds;
      },
    },
    watch: {
      timerSeconds() {
        if (this.seconds - this.timerSeconds <= 3) {
          this.setBlinking(true);
        }
        if (this.seconds - this.timerSeconds === 0) {
          this.updateState();
        }
      }
    },
    created() {
      this.$options.interval = setInterval(this.tick, 1000);

      const {path} = this.$route;
      const routeIndex = Number(path[path.length - 1]);

      switch (routeIndex) {
        case 1: this.makeTransition(this.transitions.red, 1); break;
        case 2: this.makeTransition(this.transitions.yellowAfterRed, 2); break;
        case 3: this.makeTransition(this.transitions.green, 3); break;
      }

      if (this.seconds - this.timerSeconds <= 3) {
        this.setBlinking(true);
      }
    },
    beforeDestroy() {
      clearInterval(this.$options.interval);
    },
    methods: {
      tick() {
        ++this.timerSeconds;
      },
      makeTransition(nextState, nextIndex) {
        this.updateState = nextState;
        this.timerSeconds = 0;
        this.setBlinking(false);
        this.$router.push('/' + nextIndex);
        this.activateLight(nextIndex);
      },
      setBlinking(value) {
        const currentPathIndex = this.defineCurrentRouteIndex() - 1;

        this.$set(this.lights, currentPathIndex, {
          ...this.lights[currentPathIndex],
          blinking: value,
        });
      },
      defineCurrentRouteIndex() {
        const {path} = this.$route;

        return Number(path[path.length - 1]);
      },
      activateLight(index) {
        for (let i = 0; i < this.lights.length; ++i) {
          if (i === index - 1) {
            this.$set(this.lights, i, {
              ...this.lights[i],
              active: true,
            });
          } else {
            this.$set(this.lights, i, {
              ...this.lights[i],
              active: false,
            });
          }
        }
      }
    }
  };
</script>

<style scoped>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 10px;
        background-color: #333;
        padding: 0 10px;
        box-sizing: border-box;
    }
</style>