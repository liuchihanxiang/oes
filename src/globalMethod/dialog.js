import Vue from 'vue';
let common={};
if (window)
    window.common = common;
/**
 * 
 * 该common对象放置所有的共用方法
 * common.dialog()是调用弹框的方法
 */
common.dialog = function (option) {
    var m = document.createElement('div');
    if (option.parentel != null) {
      option.parentel.appendChild(m);
    } else {
      document.getElementsByTagName('body')[0].appendChild(m);
    }
    var _d = common.clone(option.data == null ? {} : option.data);
    var v = '';
    var component = option.component;
    let template = '';
    if (typeof component == 'string') {
      template = `<el-dialog :title="title" v-model="show" ><${component} v-on:callback="callback" :init_data="data">         </${component}></el-dialog>`;
    } else if (option.htmlText != null) {
      template = `<el-dialog :title="title" v-model="show"  @close="close">${option.htmlText}</el-dialog></div>`;
    } else {
      template = '<el-dialog :style="style" :title="title" v-model="show"  :before-close="handleClose" @close="close"><child v-on:callback="callback" :init_data="data"> \
        </child></el-dialog>';
    }
    if (option.type && option.type == 'iframe') {
      v = new Vue({
          el: m,
          data: function () {
              return {
                  title: option.title,
                  url: option.url,
                  modal: true,
                  custom_class: 'dialg-class',
                  close_on_press_escape: false,
                  show_close: true,
                  show: true,
                  data: _d,
                };
            },

          template: '<div class="w680 dialog-h400" v-if="show"><el-dialog  :title="title" v-model="show" ><iframe :src="url" style="width:100%;height:100%;"></iframe> \
        </child></el-dialog></div>',
        });
    } else {
      v = new Vue({
          el: m,
          data: function () {
              return {
                  title: option.title,
                  style:option.style,
                  modal: true,
                  custom_class: 'dialg-class',
                  close_on_press_escape: false,
                  show_close: true,
                  show: true,
                  data: _d,
                };
            },
          template: template,
          mounted: function () {},
          methods: {
              handleClose(done){
                if (option.close) {
                  option.close();
                }
                done();
              },
              close() {
                if (option.close) {
                  option.close();
                }
              }
            },
          components: {
              child: option.component,
            },
        });
    }
    return v;
  };

  common.clone = function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || 'object' != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
      var copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      var copy = [];
      for (var i = 0, len = obj.length; i < len; ++i) {
        copy[i] = clone(obj[i]);
      }

      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      var copy = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
      }

      return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
  };


export default common;