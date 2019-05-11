/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- *//* this file is version 1.0 revised 5-13-2016 by Dave *//* History *//* 5-13-2016 for color shading of cells in a matrix */
/* vim: set ts=2 et sw=2 tw=80: */

/*
 * Depending on your local configuration, this file should be installed in either:
 *
 * <mathjax>/extensions/TeX
 * <mathjax>/unpacked/extensions/TeX
 *
 * To reference this file from default.js, add to the extensions array, as in:
 *
 * extensions: ["tex2jax.js","TeX/AMSmath.js","TeX/AMSsymbols.js","TeX/ieeemacros.js","TeX/cellcolor.js"],
 *
 */

MathJax.Extension["TeX/cellcolor_ieee"] = {
  version: "1.0"
};
MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {  var TEX = MathJax.InputJax.TeX;  var array = TEX.Stack.Item.array;  var MML = MathJax.ElementJax.mml;  array.Augment({    EndEntry: function () {      if (this.env.cellcolor) {        var mpadded = MML.mpadded.apply(MML,this.data);        mpadded.mathbackground = this.env.cellcolor;        mpadded.depth = mpadded.height = "+3px";        mpadded.width = "+6px";        mpadded.lspace = "3px";         this.data = [mpadded];      }      var mtd = MML.mtd.apply(MML,this.data);      if (this.env.cellcolor) mtd.mathbackground = this.env.cellcolor;      if (this.hfill.length) {        if (this.hfill[0] === 0) mtd.columnalign = "right";        if (this.hfill[this.hfill.length-1] === this.data.length)          mtd.columnalign = (mtd.columnalign ? "center" : "left");      }      this.row.push(mtd); this.data = []; this.hfill = [];    }  });  TEX.Definitions.macros.cellcolor = "ieeeCellcolor";  TEX.Parse.Augment({    ieeeCellcolor: function (name) {      var color = this.GetArgument(name);      // should do sanity check on color      this.stack.env.cellcolor = color;    }  });});

MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/cellcolor_ieee.js");
