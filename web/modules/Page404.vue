<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <div class="clearfix">
            <h1 class="float-left display-3 mr-4">404</h1>
            <h4 class="pt-3">Oops! You're lost.</h4>
            <p class="text-muted">The page you are looking for was not found.</p>
          </div>
          <b-input-group>
            <b-input-group-prepend>
              <b-input-group-text>
                <i class="fa fa-search"></i>
              </b-input-group-text>
            </b-input-group-prepend>
            <input id="prependedInput" class="form-control" size="16" type="text" placeholder="What are you looking for?">
            <b-input-group-append>
              <b-button variant="info">Search</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page404'
}
let a=[{a:1,b:2},{a:1,b:3},{a:2,c:4},{a:2,c:5},{a:4,b:3},{a:5,b:5}];
const newMap= new Map();
a.map((key,value)=>{
  if(newMap.has(key.a)){
    newMap.get(key.a).push(key)
  }else{
    newMap.set(key.a,[key])
  }
})


</script>
