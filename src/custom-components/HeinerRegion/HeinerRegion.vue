<template>
  <div class="my-regsion">
    <label>省份</label>
    <select>
        <option>广东省</option>
        <option>湖北省</option>
    </select>
    
    <label>城市</label>
    <select>
        <option>广州市</option>
        <option>佛山市</option>
    </select>

    <label>区/县</label>
    <select>
        <option>天河区</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'HeinerRegion',
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped >
.my-regsion
{
    /* border: 1px solid rgb(228, 96, 14) ; */ /**红 */
     border: 1px solid blue ; 
   
   /**黄 */
   /* border: 1px solid rgb(204, 255, 0) ; */  
    max-width: 350px;
    margin-top: 10px;
    padding: 5px;
}
</style>
