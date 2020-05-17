<template>
  <main id="app" class="content">


  <nav class="nav">
    <menu class="nav__controls">

      <li v-for="(active, menu) in menus"  :key="(active, menu)" class="nav__label"
        :class="{
          'nav__label--active' : active,
          'nav__label--filter': activeFilters[menu].length
        }" @click="setMenu(menu, active)">
        {{ menu }}
      </li>

      <li class="nav__label nav__label--clear" @click="clearAllFilters">Clear all</li>
    </menu>

    <label class="nav__label" @click="showCodes()" >Console log Codes</label>

  </nav>




  <transition-group name="dropdown" tag="section" class="dropdown" :style="dropdown">
    <menu v-for="(options, filter) in filters" class="filters"
      v-show="menus[filter]" ref="menu" :key="filter">

      <li v-if="filter === 'duration'" class="filters__duration">
        <output>
          <label>Minimum duration:&nbsp;</label>
          {{ parseFloat(filters.duration)  }}
        </output>

        <input v-model="filters.duration" class="filters__range" type="range"
          :min="duration.min" :max="duration.max" step="0.1"/>
      </li>

      <template v-else>
        <li v-for="(active, option) in options" :key="(active, option)" class="filters__item"
          :class="{ 'filters__item--active': active }"
          @click="setFilter(filter, option)">
          {{ option }}
        </li>
      </template>
    </menu>
  </transition-group>



  <Degree v-bind:list="list" />








  <transition name="modal">
    <section v-if="modal" class="modal" @click="modal = false">
      <article class="modal__content" @click.stop>
        <h4 class="modal__title">{{error}}</h4>
        <button class="modal__close" @click="modal = false">&times;</button>
      </article>
    </section>
  </transition>


  <transition name="modal">
    <section v-if="loader" class="modal"  >
      <article class="modal__content" >
        <h4 class="modal__title">Loading...</h4>
      </article>
    </section>
  </transition>





</main>
</template>














<script>
// import HelloWorld from './components/HelloWorld.vue'
import Degree from './components/Degree.vue'


export default {



  name: 'App',
  components: {
    Degree,


  },
  data() {
    return {
      modal: false,
      loader:true,
      error: "",
      degrees: [],
      dropdown: { height: 0 },
      duration: { min: 10, max: 0 },
      filters: { names: {}, levels: {}, duration: 0 },
      menus: { names: false, levels: false, duration: false }
    }
  },

  computed: {
    activeMenu() {
      return Object.keys(this.menus).reduce(($$, set, i) => (this.menus[set]) ? i : $$, -1)
    },

    list() {
      let { names, levels } = this.activeFilters

      return this.degrees.filter(({ name, level, duration}) => {
        if (Number( duration.match(/\d+/)[0] ) < this.filters.duration) return false
        if (names.length && !~names.indexOf(name)) return false
        return !levels.length || levels == level
      })
    },

    activeFilters() {
      let { names, levels } = this.filters


      return {
        names: Object.keys(names).filter(c => names[c]),
        levels: Object.keys(levels).filter(c => levels[c]),
        duration: (this.filters.duration > this.duration.min) ? [this.filters.duration] : []
      }
    }
  },

  watch: {
    activeMenu(index, from) {
      if (index === from) return;

      this.$nextTick(() => {
        if (!this.$refs.menu || !this.$refs.menu[index]) {
          this.dropdown.height = 0
        } else {
          this.dropdown.height = `${this.$refs.menu[index].clientHeight + 16}px`
        }
      })
    }
  },

  methods: {
    setFilter(filter, option) {
      if (filter === 'names') {
        this.filters[filter][option] = !this.filters[filter][option]
      } else {
        setTimeout(() => {
          this.clearFilter(filter, option, this.filters[filter][option])
        }, 100)
      }
    },


    showCodes() {

         // let { names, levels } = this.filters

         // let allFilters = {
         //   names: Object.keys(names).filter(c => names[c]),
         //   levels: Object.keys(levels).filter(c => levels[c]),
         //   duration: (this.filters.duration > this.duration.min) ? [this.filters.duration] : []
         // }

         this.degrees.forEach(function(item) {
           // if(item.name in allFilters.names  ){
             console.log(item.code)
           // }
         });

    },


    clearFilter(filter, except, active) {
      if (filter === 'duration') {
        this.filters[filter] = this.duration.min
      } else {
        Object.keys(this.filters[filter]).forEach(option => {
          this.filters[filter][option] = except === option && !active
        })
      }
    },

    clearAllFilters() {
      Object.keys(this.filters).forEach(this.clearFilter)
    },

    setMenu(menu, active) {
      Object.keys(this.menus).forEach(tab => {
        this.menus[tab] = !active && tab === menu
      })
    }
  },


  async beforeMount() {

    let endpoint1 = await fetch('http://localhost:3000/api')

    if (endpoint1.ok ) {
      var arr1 =  await endpoint1.json()

      this.loader = !this.loader
    } else {
      this.loader = !this.loader

      this.modal = !this.modal
      this.error =  "Endpoint 2`s HTTP-Error: " + endpoint1.status


     let allDegrees = arr1.concat(arr2)

     var myData =allDegrees;

     allDegrees = Array.from(new Set(myData.map(JSON.stringify))).map(JSON.parse);

     this.degrees = allDegrees

     allDegrees.forEach(({ name, level, duration }) => {
        duration = Number( duration.match(/\d+/)[0] )

        this.$set(this.filters.names, name, false)

        if (this.duration.max < duration) this.duration.max = duration
        if (this.duration.min > duration) {
          this.duration.min = duration
          this.filters.duration = duration
        }

        this.$set(this.filters.levels, level, false)

    })


  }


}


</script>



















<style>

@import "https://fonts.googleapis.com/css?family=Lato:300,900|Libre+Franklin:100,200,300,600,900|Prompt:100,200,300,600,900";
html {
  box-sizing: border-box;
  font-size: 100%;
  height: 100%;
  font-family: 'Libre Franklin', sans-serif;
}
html.lato {
  font-family: "Lato", sans-serif;
}
html.prompt {
  font-family: "Prompt", sans-serif;
}

body {
  position: relative;
  height: 100%;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* reset */
* {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
  border-radius: 0;
  border: none;
  outline: none;
  background: none;
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
  -webkit-margin-start: 0;
  -webkit-margin-end: 0;
  -webkit-padding-before: 0;
  -webkit-padding-start: 0;
  -webkit-padding-end: 0;
  -webkit-padding-after: 0;
}

*::before,
*::after {
  box-sizing: inherit;
}

*:active,
*:hover {
  outline: 0;
}

b, i, em, strong,
h1, h2, h3, h4, h5, h6,
th, td, pre, ins, del, address,
input, select, button, textarea {
  text-transform: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: normal;
  font-style: normal;
  letter-spacing: inherit;
}

textarea,
input {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  background-clip: padding-box;
}

a, ins, del, button {
  color: inherit;
  text-decoration: none;
}

ul, ol,
menu {
  list-style: none;
}

table,
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

pre,
textarea {
  overflow: auto;
  max-width: 100%;
}

img {
  width: 100%;
  height: auto;
  display: block;
}

svg:not(:root) {
  overflow: hidden;
}

form {
  width: 100%;
}

button {
  cursor: pointer;
  overflow: visible;
}

textarea {
  resize: none;
}

input[type='range'] {
  -webkit-appearance: none;
  background-color: transparent;
}
input[type='range']::-ms-track {
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
}

::moz-focus-inner {
  padding: 0;
  border: none;
}

.content {
  position: relative;
  font-family: 'Nunito', sans-serif;
  font-weight: 300;
  color: #3d5358;
  max-width: 780px;
  margin: 0 auto;
}
.content__list {
  position: relative;
  margin-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 5rem;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
}

.company {
  position: relative;
  width: calc(100% / 2 - 1rem);
  display: -webkit-inline-box;
  display: inline-flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
          flex-direction: column;
  -webkit-box-pack: justify;
          justify-content: space-between;
  margin-left: 1rem;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-radius: 6px;
  background-color: white;
  box-shadow: 0 0 0 1px #c5d0d1;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  -webkit-transform-origin: 10% 50%;
          transform-origin: 10% 50%;
  z-index: 1;
}
@media (min-width: 800px) {
  .company {
    width: calc(100% / 3 - 1rem);
  }
}
.company-move {
  -webkit-transition: all 600ms ease-in-out 50ms;
  transition: all 600ms ease-in-out 50ms;
}
.company-enter-active {
  -webkit-transition: all 300ms ease-out;
  transition: all 300ms ease-out;
}
.company-leave-active {
  -webkit-transition: all 200ms ease-in;
  transition: all 200ms ease-in;
  position: absolute;
  z-index: 0;
}
.company-enter, .company-leave-to {
  opacity: 0;
}
.company-enter {
  -webkit-transform: scale(0.9);
          transform: scale(0.9);
}
.degree_data {
  line-height: 1.3;
}
.degree__label {
  font-size: 0.8rem;
}
.degree__duration {
  text-align: center;
}
.degree_info {
  padding: 0 0.75rem;
  text-align: center;
}
.company__logo {
  width: 3rem;
  height: 3rem;
  margin: 0 auto;
}
.degree_name {
  height: 2.5rem;
  margin: 0.75rem 0;
  font-size: 1.3rem;
  font-weight: 200;
  text-align: center;
}
.degree_item {
  height: 2rem;
  text-align: center;
  font-weight: 400;
  text-transform: capitalize;
}
.degree_details {
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: justify;
          justify-content: space-between;
  margin-top: 1.5rem;
  padding: 0.5rem 0.75rem;
  background-color: rgba(197, 208, 209, 0.1);
  border-top: 1px solid #c5d0d1;
}
.degree_class:hover {
  text-decoration: underline;
  cursor: pointer;
}

.nav {
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: justify;
          justify-content: space-between;
  -webkit-box-align: center;
          align-items: center;
  white-space: nowrap;
  margin: 0 1rem;
  padding: 2rem 0.5rem 1rem;
  border-bottom: 1px solid #c5d0d1;
}
.nav__controls {
  display: -webkit-box;
  display: flex;
}
.nav__icon {
  width: 1rem;
  height: 1rem;
  fill: currentColor;
}
.nav__label {
  position: relative;
  margin-left: 1rem;
  text-transform: capitalize;
  z-index: 1;
  cursor: pointer;
}
.nav__label::after {
  content: '\00d7';
  display: inline-block;
  color: transparent;
  width: 0.5rem;
  font-weight: 400;
  -webkit-transform: scale(0);
          transform: scale(0);
  -webkit-transition: -webkit-transform 150ms ease-in-out;
  transition: -webkit-transform 150ms ease-in-out;
  transition: transform 150ms ease-in-out;
  transition: transform 150ms ease-in-out, -webkit-transform 150ms ease-in-out;
}
.nav__label--clear {
  color: #f68185;
  opacity: 0;
  -webkit-transform: translate3d(-25%, 0, 0);
          transform: translate3d(-25%, 0, 0);
  pointer-events: none;
  -webkit-transition: all 275ms ease-in-out;
  transition: all 275ms ease-in-out;
}
.nav__label--filter ~ .nav__label--clear {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
  pointer-events: auto;
}
.nav__label--filter::after, .nav__label--active::after {
  -webkit-transform: scale(1);
          transform: scale(1);
}
.nav__label--filter::after {
  content: '\2022';
  color: #46d2c4;
}
.nav__label--active::after {
  content: '\00d7';
  color: #f68185;
}

.dropdown {
  position: relative;
  height: 0;
  overflow: hidden;
  -webkit-transition: height 350ms;
  transition: height 350ms;
}
.dropdown::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  background-image: -webkit-gradient(linear, left bottom, left top, from(white), to(rgba(255, 255, 255, 0)));
  background-image: linear-gradient(to top, white, rgba(255, 255, 255, 0));
}
.dropdown-enter, .dropdown-leave-to {
  opacity: 0;
}
.dropdown-leave, .dropdown-enter-to {
  opacity: 1;
}
.dropdown-enter-active, .dropdown-leave-active {
  position: absolute;
  width: 100%;
  -webkit-transition: opacity 200ms ease-in-out;
  transition: opacity 200ms ease-in-out;
}
.dropdown-enter-active {
  -webkit-transition-delay: 100ms;
          transition-delay: 100ms;
}

.filters {
  padding: 0 1rem;
  display: -webkit-box;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-align: start;
          align-items: flex-start;
}
.filters__item {
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid #c5d0d1;
  border-radius: 6px;
  font-size: 0.8rem;
  line-height: 1.35;
  cursor: pointer;
  -webkit-transition: all 275ms;
  transition: all 275ms;
}
.filters__item:hover {
  border-color: #379a93;
}
.filters__item--active {
  color: white;
  border-color: #379a93;
  background-color: #379a93;
}
.filters__duration {
  width: 100%;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
          flex-direction: column;
  -webkit-box-align: center;
          align-items: center;
  padding: 1.5rem 0;
}
.filters__range {
  width: 200px;
  margin-top: 1rem;
  color: inherit;
}
.filters__range::-webkit-slider-thumb {
  width: 0.8rem;
  height: 0.8rem;
  margin-top: calc(-0.4rem + 2px);
  border-radius: 100%;
  background-color: currentColor;
}
.filters__range::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  background-image: -webkit-gradient(linear, left top, right top, from(white), to(#46d2c4));
  background-image: linear-gradient(to right, white, #46d2c4);
}

.modal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: center;
          justify-content: center;
  -webkit-box-align: center;
          align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 1;
}
.modal-enter-active, .modal-leave-active {
  -webkit-transition: opacity 350ms;
  transition: opacity 350ms;
}
.modal-enter, .modal-leave-to {
  opacity: 0;
}
.modal-leave, .modal-enter-to {
  opacity: 1;
}
.modal__content {
  position: relative;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
          flex-direction: column;
  -webkit-box-pack: center;
          justify-content: center;
  -webkit-box-align: center;
          align-items: center;
  width: 90%;
  max-width: 500px;
  min-height: 250px;
  padding: 1.5rem 1rem;
  background-color: white;
  border: 1px solid #c5d0d1;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 0.5rem 1.75rem -0.25rem rgba(61, 83, 88, 0.4);
}
.modal__title {
  font-weight: 400;
  font-size: 1.5rem;
}
.modal__link {
  margin-top: 1.5rem;
  position: relative;
  font-size: 1.2rem;
  font-weight: 300;
  z-index: 0;
}
.modal__link::after {
  content: '';
  width: 100%;
  height: 1px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: currentColor;
  z-index: -1;
  -webkit-transition: background-color 225ms ease-out;
  transition: background-color 225ms ease-out;
}
.modal__link:hover::after {
  background-color: #46d2c4;
}
.modal__close {
  position: absolute;
  top: 0.25rem;
  right: 1rem;
  font-size: 1.75rem;
  font-weight: 400;
  opacity: 0.5;
  -webkit-transition: opacity 150ms ease-out;
  transition: opacity 150ms ease-out;
}
.modal__close:hover {
  opacity: 1;
}


</style>
