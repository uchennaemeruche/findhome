import Vue from 'vue';

Vue.filter('currencyFormat', function(value){
    if (typeof value !== "number") {
      return value;
    }
    return new Intl.NumberFormat().format(value);
    
  })