<template>
  <div class="hello">


    <transition-group name="company" tag="ul" class="content__list">
      <li class="company" v-for="degree in list" :key="degree.code">
        <div class="degree_info">

          <h2 class="degree_name">{{ degree.name }}</h2>
          <p class="degree_item">{{ degree.level}}</p>
          <blockquote class="degree_item">{{  degree.duration  }}</blockquote>
        </div>

        <ul class="degree_details">
          <li class="degree_data">
            <label class="degree__label">Degree</label>
            <p class="degree_class"
              @click="clearFilter('names', degree.name)">
              {{ degree.name }}
            </p>
          </li>

          <li class="degree_data">
            <label class="degree__label">Duration</label>
            <p class="degree__duration">{{   Number( degree.duration.match(/\d+/)[0] )   }}</p>
          </li>
        </ul>
      </li>
    </transition-group>




  </div>
</template>

<script>
export default {
  name: 'Degree',
  props: ["list"]

}
</script>

<style scoped>

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
</style>
