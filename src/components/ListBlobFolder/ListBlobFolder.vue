<template>
  <div class="">
    <h1>listBlobFolder</h1>
    <input type="button" value="signIn" @click="signIn" />
    <input type="button" value="listBlob" @click="listBlob" />
  </div>
</template>

<script>
 import customTokenCredential from '../CustomTokenCredential.js';
 import authConfig from '../authConfig';
 import * as authPopup from '../authPopup';
 import * as authRedirect from '../authRedirect';

export default {
  name: 'HelloWorld',
  components:{
    
  },
  props: {
    msg: String
  },
  mounted()
  {
    authRedirect.selectAccount();

  },
  methods:{
    signIn()
    {
      authRedirect.signIn();

    },
    listBlob()
    {
      authRedirect.readBlob();
    }
  }
}
</script>


