/*!
 * User: carson
 * Date: 16-12-22 下午1:57
 * Contact way: QQ77642304
 * Detail: js-利用 canvas 让图片旋转角度
 * url: http://orzcss.com/
 */

! function ($) {
    var UA = navigator.userAgent;
    var IsIos = /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(UA); // ios终端
    var IsAndroid = /(Android);?[\s\/]+([\d.]+)?/.test(UA); // android终端或者uc浏览器

    var DEFAULT_OPTIONS = {
        layer: '.layer',
        img: '.img',
        rotate: 90,
        callback: null
    }

    function rotateImg(elem, args) {
        this.config = $.extend(DEFAULT_OPTIONS, args || {});
        this.el = elem;
        this.init();
    }

    rotateImg.prototype = {
        "init": function () {
            var $self = this;

            $self.el.on({
                'mouseenter': function () {
                    $(this).find($self.config.layer).addClass('active');
                },
                'mouseleave': function () {
                    $(this).find($self.config.layer).removeClass('active');
                },
                'click': function () {
                    $self.$enter = $(this);
                    if ($self.$enter.hasClass('active')) {
                        return;
                    }

                    $self.$enter.addClass('active');

                    $self.$layer = $self.$enter.find($self.config.layer);
                    $self.$img = $self.$enter.find($self.config.img);

                    if (IsIos || IsAndroid) {
                        $self.$layer.addClass('active');
                    }

                    $self.change();
                }
            });
        },
        "change": function () {
            this.new_img = new Image();
            this.canvas = document.createElement('canvas');
            this.cxt = this.canvas.getContext('2d');

            this.hh = 0;
            this.ww = 0;

            this.$layer.addClass('loading');
            //this.new_img.crossOrigin = "anonymous";
            this.new_img.src = this.$img.attr('src');

            setTimeout($.proxy(function () {
                if (this.new_img.complete) {
                    this.hh = this.new_img.height;
                    this.ww = this.new_img.width;
                    this.drawing();
                    return;
                }

                new_img.onload = function () {
                    this.hh = this.new_img.height;
                    this.ww = this.new_img.width;
                    this.drawing();
                };
            }, this), 1000);
        },
        "drawing": function () {
            this.$enter.removeClass('active');
            this.$layer.removeClass('loading');
            this.hh = this.new_img.height;
            this.ww = this.new_img.width;
            this.canvas.width = this.hh;
            this.canvas.height = this.ww;
            this.cxt.translate(this.hh, 0);
            this.cxt.rotate(this.config.rotate * Math.PI / 180);
            this.cxt.drawImage(this.new_img, 0, 0);
            this.$img.attr('src', this.canvas.toDataURL());
            if (IsIos || IsAndroid) {
                this.$layer.removeClass('active');
            }
        }
    };

    $.fn.rotateImg = function (args) {
        return this.each(function () {
            var $el = $(this),
                plugins = new rotateImg($el, args);
            $el.data('rotateImg', plugins);
        });
    };
}(jQuery);

//$(function () {
//  var ua = navigator.userAgent;
//  var isIos = /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(ua); // ios终端
//  var isAndroid = /(Android);?[\s\/]+([\d.]+)?/.test(ua); // android终端或者uc浏览器
//
//  $('.enter').on({
//      'mouseenter': function () {
//          $(this).find('.layer').addClass('active');
//      },
//      'mouseleave': function () {
//          $(this).find('.layer').removeClass('active');
//      },
//      'click': function (e) {
//          var $enter = $(this);
//
//          if ($enter.hasClass('active')) {
//              return;
//          }
//
//          $enter.addClass('active');
//
//          var $img = $enter.find('.img');
//          var $layer = $enter.find('.layer');
//
//          if (isIos || isAndroid) {
//              $layer.addClass('active');
//          }
//
//          var new_img = new Image();
//          var canvas = document.createElement('canvas');
//          var cxt = canvas.getContext('2d');
//
//          var hh, ww, obj;
//
//          $layer.addClass('loading');
//          //new_img.crossOrigin = "anonymous";
//          new_img.src = $img.attr('src');
//
//          setTimeout(function () {
//              obj = {
//                  enter: $enter,
//                  layer: $layer,
//                  canvas: canvas,
//                  cxt: cxt,
//                  img: $img,
//                  new_img: new_img,
//                  rotate: 90
//              };
//
//              if (new_img.complete) {
//                  obj.hh = new_img.height;
//                  obj.ww = new_img.width;
//                  createCanvas(obj);
//                  return;
//              }
//
//              new_img.onload = function () {
//                  obj.hh = new_img.height;
//                  obj.ww = new_img.width;
//                  createCanvas(obj);
//              };
//          }, 1000);
//      }
//  });
//
//  function createCanvas(obj) {
//      obj.enter.removeClass('active');
//      obj.layer.removeClass('loading');
//      obj.hh = obj.new_img.height;
//      obj.ww = obj.new_img.width;
//      obj.canvas.width = obj.hh;
//      obj.canvas.height = obj.ww;
//      obj.cxt.translate(obj.hh, 0);
//      obj.cxt.rotate(obj.rotate * Math.PI / 180);
//      obj.cxt.drawImage(obj.new_img, 0, 0);
//      obj.img.attr('src', obj.canvas.toDataURL());
//      if (isIos || isAndroid) {
//          obj.layer.removeClass('active');
//      }
//  }
//});
/*
0:
canvas.width = width;
canvas.height = height;
cxt.translate(0, 0);
cxt.rotate(0 * Math.PI / 180);

90:
canvas.width = height;
canvas.height = width;
cxt.translate(height, 0);
cxt.rotate(90 * Math.PI / 180);

180:
canvas.width = width;
canvas.height = height;
cxt.translate(width, height);
cxt.rotate(180 * Math.PI / 180);

270:
canvas.width = height;
canvas.height = width;
cxt.translate(0, width);
cxt.rotate(270 * Math.PI / 180);
*/