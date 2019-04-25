/*
 *  /MathJax/extensions/TeX/upgreek.js
 *
 *  Copyright (c) 2009-2017 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

MathJax.Extension["TeX/upgreek"]={version:"2.7.2"};
MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var a=MathJax.ElementJax.mml,b=MathJax.InputJax.TeX.Definitions;
b.Add({
mathchar0mi:{
upalpha:["03B1",{variantForm:true}],
upbeta:["03B2",{variantForm:true}],
upchi:["03C7",{variantForm:true}],
updelta:["03B4",{variantForm:true}],
upepsilon:["03F5",{variantForm:true}],
upeta:["03B7",{variantForm:true}],
upgamma:["03B3",{variantForm:true}],
upiota:["03B9",{variantForm:true}],
upkappa:["03BA",{variantForm:true}],
uplambda:["03BB",{variantForm:true}],
upmu:["03BC",{variantForm:true}],
upnu:["03BD",{variantForm:true}],
upomega:["03C9",{variantForm:true}],
upphi:["03C6",{variantForm:true}],
uppi:["03C0",{variantForm:true}],
uppsi:["03C8",{variantForm:true}],
uprho:["03C1",{variantForm:true}],
upsigma:["03C3",{variantForm:true}],
uptau:["03C4",{variantForm:true}],
uptheta:["03B8",{variantForm:true}],
upupsilon:["028A",{variantForm:true}],
upvarepsilon:["03F5",{variantForm:true}],
upvarphi:["03C6",{variantForm:true}],
upvarpi:["03D6",{variantForm:true}],
upvarrho:["03F1",{variantForm:true}],
upvarsigma:["03C2",{variantForm:true}],
upvartheta:["03D1",{variantForm:true}],
upxi:["03BE",{variantForm:true}],
upzeta:["03B6",{variantForm:true}]
}});
MathJax.Hub.Startup.signal.Post("TeX upgreek Ready")});
MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/upgreek.js");
