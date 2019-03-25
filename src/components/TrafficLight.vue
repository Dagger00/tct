<template>
  <div>
    <light
      v-for="item in lights"
      :active="item.active"
      :color="item.color"
      :seconds="currentSeconds"
      :blinking="item.blinking"
      :key="item.color"
    >
    </light>
  </div>
</template>

<script>
  import Light from './Light.vue'

  export default {
    components: {
      Light
    },
    props: {
      seconds: {
        type: Number,
        'default': 3,
      },
    },
    computed: {
      currentSeconds: function () {
        return this.seconds - this.timerSeconds;
      },
    },
    data: function () {
      return {
        timerSeconds: 0,
        currentRoute: this.$route,
        previousRoute: null,
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
            color: '#76FF03',
            blinking: false,
          },
        ],
      }
    },
    methods: {
      tick() {
        ++this.timerSeconds;
        if (this.seconds - this.timerSeconds <= 3) {
          this.setBlinking(true);
        }
        if (this.seconds === this.timerSeconds) {
          this.setBlinking(false);
          this.changeRoute();
        }
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

        if (path === '/1') {
          return 1;
        } else if (path === '/2') {
          return 2;
        } else {
          return 3;
        }
      },
      defineNextRouteIndex() {
        const {path} = this.$route;

        if (path === '/1') {
          return 2;
        } else if (path === '/2') {
          if (this.previousRoute) {
            if (this.previousRoute.path === '/1') {
              return 3;
            } else {
              return 1;
            }
          } else {
            return 3;
          }
        }

        return 2;
      },
      changeRoute() {
        this.timerSeconds = 0;

        const newPrevRoute = this.$route;
        const newIndex = this.defineNextRouteIndex();

        this.activateLight(newIndex);

        this.$router.push('/' + newIndex);
        this.previousRoute = newPrevRoute;
        this.currentRoute = this.$route;
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
    },
    created() {
      this.$options.interval = setInterval(this.tick, 1000);
      switch (this.$route.path) {
        case '/1':
          this.activateLight(1);
          break;
        case '/2':
          this.activateLight(2);
          break;
        case '/3':
          this.activateLight(3);
          break;
      }
    },
    beforeDestroy() {
      clearInterval(this.$options.interval)
    }
  }
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