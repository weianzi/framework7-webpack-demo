'use strict';

import 'framework7';
import 'framework7.material.css';
import 'framework7.material.color.css';
import '../assets/app.less';

import mainModule from './main/main';
import Router from './router';

if (process.env.NODE_ENV !== 'production') {
  require('../index.html');
  require('../page/detail.html');
}

var app = {
    init(){
        // Init App
        window.$ = Dom7;
        window.myApp = new Framework7({
            // Enable Material theme
            material: true,
            pushState: true,
        });
        myApp.addView('.view-main', {
            domCache: true
        });
        //alert(2);
        mainModule.init();
        Router.init();
    }
};
app.init();
