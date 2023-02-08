import SlzDependencyTest from "./SlzDependencyTest/SlzDependencyTest.vue"
import HeinerRegion from "./HeinerRegion/HeinerRegion.vue"

SlzDependencyTest.install = Vue => Vue.component(SlzDependencyTest.name, SlzDependencyTest);
HeinerRegion.install = Vue => Vue.component(HeinerRegion.name, HeinerRegion);

export{ SlzDependencyTest,HeinerRegion};