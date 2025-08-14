# Changelog

## [1.11.0](https://github.com/Rhino-Energy/rhino-frontend/compare/webapp-v1.10.0...webapp-v1.11.0) (2025-08-14)


### Features

* Add links to consumption chart in the selected measurements panel in periodic alarm [PRD-3215] ([#92](https://github.com/Rhino-Energy/rhino-frontend/issues/92)) ([5fcd0b4](https://github.com/Rhino-Energy/rhino-frontend/commit/5fcd0b418e20ec9a8d71bb3276a8110c8c163a28))
* Add links to consumption chart in the selected measurements panel in periodic alarm [PRD-3215] ([#98](https://github.com/Rhino-Energy/rhino-frontend/issues/98)) ([1adee9c](https://github.com/Rhino-Energy/rhino-frontend/commit/1adee9c66694d9559ef5b0ba18da85aa04890ab7))
* Add option for disabling and hiding top ribbon items [PRD-3116] ([#106](https://github.com/Rhino-Energy/rhino-frontend/issues/106)) ([1b0004a](https://github.com/Rhino-Energy/rhino-frontend/commit/1b0004a1b5d6a2c1a54bd6d1b48158cf6224f38f))
* Add Periodic Alarm permission and use it for accessing periodic alarm feature [PRD-3227] ([#94](https://github.com/Rhino-Energy/rhino-frontend/issues/94)) ([807493e](https://github.com/Rhino-Energy/rhino-frontend/commit/807493e2186280fdfa58d8591d0265a434e986a4))
* Add readonly mode for shared users [PRD-3116] ([#100](https://github.com/Rhino-Energy/rhino-frontend/issues/100)) ([3dae62d](https://github.com/Rhino-Energy/rhino-frontend/commit/3dae62d75f730fef2c72de5a06e876e67b63c24a))
* Add support for configuring periodic alarm to send report only when atleast one is exceeded [PRD-3203] ([#86](https://github.com/Rhino-Energy/rhino-frontend/issues/86)) ([18e2337](https://github.com/Rhino-Energy/rhino-frontend/commit/18e233768823d62c27fd833fe73a9269532c6c1f))
* Create modal for showing details of an alarm ( executions) [PRD-3117] ([#84](https://github.com/Rhino-Energy/rhino-frontend/issues/84)) ([0baafe0](https://github.com/Rhino-Energy/rhino-frontend/commit/0baafe03a4a814d302b36c27b8ccc661ce3eb96a))
* Implement periodic alarm update [PRD-3116] ([#88](https://github.com/Rhino-Energy/rhino-frontend/issues/88)) ([e4c6e84](https://github.com/Rhino-Energy/rhino-frontend/commit/e4c6e842464140e006dccb0c1a8dd3491286d469))
* Remove validation for recipients [PRD-3220] ([#93](https://github.com/Rhino-Energy/rhino-frontend/issues/93)) ([74878a7](https://github.com/Rhino-Energy/rhino-frontend/commit/74878a79f436878b59df8785d2e85d1ecdb3b436))
* Rename user zone to timezone [PRD-3113] ([#80](https://github.com/Rhino-Energy/rhino-frontend/issues/80)) ([14846ae](https://github.com/Rhino-Energy/rhino-frontend/commit/14846ae84ee4bfe623e9f5db3866155ba5502349))


### Bug Fixes

* Add limit for percent number input [PRD-3117] ([#101](https://github.com/Rhino-Energy/rhino-frontend/issues/101)) ([198b004](https://github.com/Rhino-Energy/rhino-frontend/commit/198b0045368fa9b876f30f97843f99943b8bc3a4))
* Change threshold value decimal place to 2 [PRD-3113] ([#107](https://github.com/Rhino-Energy/rhino-frontend/issues/107)) ([2b2ae52](https://github.com/Rhino-Energy/rhino-frontend/commit/2b2ae52d4b6ca0ab8e0976b664daf0c22ebc0472))
* Fix active button and validation error in periodic alarm form [PRD-3116] ([#99](https://github.com/Rhino-Energy/rhino-frontend/issues/99)) ([d78c6a1](https://github.com/Rhino-Energy/rhino-frontend/commit/d78c6a1935ad04e5744c27dc797a01e8ed7157c0))
* Fix asset loading issues [PRD-3209] ([#81](https://github.com/Rhino-Energy/rhino-frontend/issues/81)) ([7b6c80c](https://github.com/Rhino-Energy/rhino-frontend/commit/7b6c80c4979715f8c844b0e28fc3acda3b1c5706))
* Fix Execution button visibility issue [PRD-3117] ([#91](https://github.com/Rhino-Energy/rhino-frontend/issues/91)) ([7badeb9](https://github.com/Rhino-Energy/rhino-frontend/commit/7badeb9bbca33c0e19b77ae902845f9231c11b15))
* Fix form validations and sharing component issues [PRD-3113] ([#87](https://github.com/Rhino-Energy/rhino-frontend/issues/87)) ([496a61f](https://github.com/Rhino-Energy/rhino-frontend/commit/496a61f04278f51f4fa6ee1f14ab448b84ff9031))
* Fix issues in measurement select component [PRD-3184] ([#97](https://github.com/Rhino-Energy/rhino-frontend/issues/97)) ([8cf7908](https://github.com/Rhino-Energy/rhino-frontend/commit/8cf7908f98cba86c58d3c9f216cfb6483de9cf80))
* Fix issues periodic alarm creation [PRD-3113] ([#85](https://github.com/Rhino-Energy/rhino-frontend/issues/85)) ([79fe3a0](https://github.com/Rhino-Energy/rhino-frontend/commit/79fe3a07f3fd8114d7dd980102e4e2af7cb99ae0))
* Fix measurement selection issue in periodic update  [PRD-3116] ([#102](https://github.com/Rhino-Energy/rhino-frontend/issues/102)) ([44766ea](https://github.com/Rhino-Energy/rhino-frontend/commit/44766ea4ee29c1abf559c18b60f9b013e2c2890a))
* Fix periodic alarm translation and namings [PRD-3116] ([#83](https://github.com/Rhino-Energy/rhino-frontend/issues/83)) ([4046bc2](https://github.com/Rhino-Energy/rhino-frontend/commit/4046bc27847489122dd865f4b87046fb80969415))
* Handle login page crash for inactive users and prevent server 500 errors ([#89](https://github.com/Rhino-Energy/rhino-frontend/issues/89)) ([e117ba2](https://github.com/Rhino-Energy/rhino-frontend/commit/e117ba2f2ce68ac93d289e936fa5953ea9011632))
* Handle number field validation issue [PRD-3113] ([#95](https://github.com/Rhino-Energy/rhino-frontend/issues/95)) ([6daf15b](https://github.com/Rhino-Energy/rhino-frontend/commit/6daf15bf626da613bcb340adc3ec5d0b6c780a63))
* Prevent UI break on threshold fields errors and increase max length for threshold values [PRD-3113] ([#90](https://github.com/Rhino-Energy/rhino-frontend/issues/90)) ([0f20e34](https://github.com/Rhino-Energy/rhino-frontend/commit/0f20e34b6c99919979cd4a64bf0b7c5aab3aab5e))
* Resolve execution modal issues [PRD-3117] ([#96](https://github.com/Rhino-Energy/rhino-frontend/issues/96)) ([6c1102d](https://github.com/Rhino-Energy/rhino-frontend/commit/6c1102d9c6011c87d90a32b300c26fa7de63d5ac))
* Resolve execution modal ui issues [PRD-3117] ([#105](https://github.com/Rhino-Energy/rhino-frontend/issues/105)) ([a162ae6](https://github.com/Rhino-Energy/rhino-frontend/commit/a162ae6cacd64a57008d260fddd94dfb69b2e788))
* Resolve re rendering issue when change the language ([#103](https://github.com/Rhino-Energy/rhino-frontend/issues/103)) ([bced7b2](https://github.com/Rhino-Energy/rhino-frontend/commit/bced7b258fcb9bd02b6011284d10da19c3f6fbff))
* Resolve threshold value field zero validation issue [PRD-3113] ([#104](https://github.com/Rhino-Energy/rhino-frontend/issues/104)) ([67a3195](https://github.com/Rhino-Energy/rhino-frontend/commit/67a31952405568d0c6efd1e6a846b6efc84a6530))

## [1.10.0](https://github.com/Rhino-Energy/rhino-frontend/compare/webapp-v1.9.0...webapp-v1.10.0) (2025-07-25)


### Features

* Add AccessAuthorizer wrapper for protecting page accessibility based on user type and permissions ([b748959](https://github.com/Rhino-Energy/rhino-frontend/commit/b748959b6768ff3e1ae85531c618bcf64a04a134))
* add alarm list page ([0bf0bb5](https://github.com/Rhino-Energy/rhino-frontend/commit/0bf0bb51bbda5aeb28c7678ea53604a575649684))
* Add alarm list page UI ([e602631](https://github.com/Rhino-Energy/rhino-frontend/commit/e602631c7878d712679d800be411a18285247b2b))
* Add alarm list page UI [PRD-3114] ([0b4ca91](https://github.com/Rhino-Energy/rhino-frontend/commit/0b4ca91dfa61ec78a9d8574b54147393f1111fa9))
* Add alarm list page UI [PRD-3114] ([678a0f1](https://github.com/Rhino-Energy/rhino-frontend/commit/678a0f1d394ad49d792c0d15b29354edac32e7ca))
* Add alarm list page UI [PRD-3114] ([c81bdf0](https://github.com/Rhino-Energy/rhino-frontend/commit/c81bdf01ef43129dd7d993a7b61a46ac9dcd1ca0))
* Add alarm list page UI [PRD-3114] ([5c5a542](https://github.com/Rhino-Energy/rhino-frontend/commit/5c5a542e4a85471fe7f1dd5aade55ea4c9689a3f))
* Add alarm list page UI [PRD-3114] ([3ff2ca6](https://github.com/Rhino-Energy/rhino-frontend/commit/3ff2ca6d9398e9796ac4e5d648d46496c346a701))
* Add alarm list page UI~ ([3d12c71](https://github.com/Rhino-Energy/rhino-frontend/commit/3d12c71b0851109a281fd917f712e0947cb0cd67))
* Add basic input component and change headless ui component to mantain ui [PRD-3113] ([#71](https://github.com/Rhino-Energy/rhino-frontend/issues/71)) ([aed0128](https://github.com/Rhino-Energy/rhino-frontend/commit/aed01283e902cad0eb77b0e977693a21716b5c4c))
* add e2e data test ids [PRD-3125] ([#68](https://github.com/Rhino-Energy/rhino-frontend/issues/68)) ([65c7875](https://github.com/Rhino-Energy/rhino-frontend/commit/65c7875c5dbc6e2984acaca60d1ccf3c83b5da06))
* add mantain ui ([51cb408](https://github.com/Rhino-Energy/rhino-frontend/commit/51cb4088f7341b60d641e50a8322304492102faf))
* Add measurement selection component [PRD-3184] ([#78](https://github.com/Rhino-Energy/rhino-frontend/issues/78)) ([03a2dab](https://github.com/Rhino-Energy/rhino-frontend/commit/03a2dabd0a5ffdab446986de4ccf36fa39b613e4))
* Add Page view permission ([733e08e](https://github.com/Rhino-Energy/rhino-frontend/commit/733e08ea8a140a22ca2fe83a1c008de1d4a15b6a))
* Implemente deletion functionality for periodic alarms [PRD-3115] ([#74](https://github.com/Rhino-Energy/rhino-frontend/issues/74)) ([620e47a](https://github.com/Rhino-Energy/rhino-frontend/commit/620e47a92971f5f7d23a818f516c956483f626a8))
* periodic alarm api integrated ([2f201f6](https://github.com/Rhino-Energy/rhino-frontend/commit/2f201f6c593484e92b1dea553dac2dc386c112ee))


### Bug Fixes

* Change UI library from HeadLess to Mantain and fix combobox issues [PRD-3113] ([19ccf0d](https://github.com/Rhino-Energy/rhino-frontend/commit/19ccf0d3354a36512f2c892c96111f22b6f95d51))
* Resolve spacing issue in top ribbon input field ([98173f6](https://github.com/Rhino-Energy/rhino-frontend/commit/98173f67d9fe05fd954f9587a3feb8314363ec5c))

## [1.9.0](https://github.com/Rhino-Energy/rhino-frontend/compare/webapp-v1.8.1...webapp-v1.9.0) (2025-06-28)


### Features

* Add flag for redirecting to charts from dashboard [PRD-3118] ([#65](https://github.com/Rhino-Energy/rhino-frontend/issues/65)) ([1e04cca](https://github.com/Rhino-Energy/rhino-frontend/commit/1e04cca329b924f7231b5b4b465a8a84a7176565))

## [1.8.1](https://github.com/Rhino-Energy/rhino-frontend/compare/webapp-v1.8.0...webapp-v1.8.1) (2025-06-20)


### Bug Fixes

* Fix timezone and sorting issues in dashboard ([#62](https://github.com/Rhino-Energy/rhino-frontend/issues/62)) ([43a1666](https://github.com/Rhino-Energy/rhino-frontend/commit/43a16668be5faf1d2eb0e3e61f75ba2b00c6740b))

## [1.8.0](https://github.com/Rhino-Energy/rhino-frontend/compare/webapp-v1.7.0...webapp-v1.8.0) (2025-06-18)


### Features

* Implement client sidebar dynamic logo [PRD-1386] ([#60](https://github.com/Rhino-Energy/rhino-frontend/issues/60)) ([fbd5596](https://github.com/Rhino-Energy/rhino-frontend/commit/fbd5596d41db288d728b494917703e1dd8a3087d))

## [1.7.0](https://github.com/Rhino-Energy/rhino-frontend/compare/webapp-v1.6.0...webapp-v1.7.0) (2025-06-11)


### Features

* set selected client from wicket through params [PRD-1386] ([#59](https://github.com/Rhino-Energy/rhino-frontend/issues/59)) ([b7e3e05](https://github.com/Rhino-Energy/rhino-frontend/commit/b7e3e058653e8b235897ed87c3a505b3c6754e12))


### Bug Fixes

* Fix type error during build [PRD-1386] ([#57](https://github.com/Rhino-Energy/rhino-frontend/issues/57)) ([2fc4684](https://github.com/Rhino-Energy/rhino-frontend/commit/2fc4684d3b9ba42a19fc06b20d1bd7e8336b40ef))

## [1.6.0](https://github.com/Rhino-Energy/rhino-frontend/compare/webapp-v1.5.1...webapp-v1.6.0) (2025-06-10)


### Features

* add hook to persist dashboard api filters ([#55](https://github.com/Rhino-Energy/rhino-frontend/issues/55)) ([6dc88fc](https://github.com/Rhino-Energy/rhino-frontend/commit/6dc88fc5de151eadb4bc1a69d3636e0ee5400adf))

## [1.5.1](https://github.com/Rhino-Energy/rhino-frontend/compare/webapp-v1.5.0...webapp-v1.5.1) (2025-06-06)


### Bug Fixes

* Fix issues in polish encoding [PRD-1386] ([#53](https://github.com/Rhino-Energy/rhino-frontend/issues/53)) ([6bd18df](https://github.com/Rhino-Energy/rhino-frontend/commit/6bd18df6b910aa580ddedb117dd98d06678aac16))

## [1.5.0](https://github.com/Rhino-Energy/rhino-frontend/compare/webapp-v1.4.0...webapp-v1.5.0) (2025-06-06)


### Features

* Trigger deployment [PRD-1386] ([#51](https://github.com/Rhino-Energy/rhino-frontend/issues/51)) ([7236c12](https://github.com/Rhino-Energy/rhino-frontend/commit/7236c121eafa774a7773d4138ae4531657a48fe2))

## [1.4.0](https://github.com/Rhino-Energy/rhino-frontend/compare/webapp-v1.3.0...webapp-v1.4.0) (2025-06-06)


### Features

* add dashboard location name filter ([da7feef](https://github.com/Rhino-Energy/rhino-frontend/commit/da7feef4397c9679c491ca2560fe68ed21f24b5c))
* Add favorite meter changes ([bca3d0e](https://github.com/Rhino-Energy/rhino-frontend/commit/bca3d0e43571a2e955dcec9062b5546e8457cc3a))
* add favorite meter section ([e4d35b9](https://github.com/Rhino-Energy/rhino-frontend/commit/e4d35b99c3e014723b21baf03449a73d348771c5))
* add locale as params for dashboard table options ([ef30d3f](https://github.com/Rhino-Energy/rhino-frontend/commit/ef30d3fc03858de60f03bfd7d2b89442cee7ca8e))
* Add prod setup in CI [PRD-1386] ([#49](https://github.com/Rhino-Energy/rhino-frontend/issues/49)) ([90772ee](https://github.com/Rhino-Energy/rhino-frontend/commit/90772ee8c60f7a88a6e6a95139ede5d9cdd1bff6))
* add translation (en | pl) ([cbe366d](https://github.com/Rhino-Energy/rhino-frontend/commit/cbe366d86f8e0fc9c7b1ebc9b637c0c33b488efb))
* add user drop down and integrate api too ([a359c68](https://github.com/Rhino-Energy/rhino-frontend/commit/a359c6820c7a54ed7cbb72c95d8cf5590a888c8f))
* add user drop down on top rippon ([f837143](https://github.com/Rhino-Energy/rhino-frontend/commit/f837143479bcebbb426cdf38487d00fc18a73fd5))
* change base route api to api/app for UI ([c7faa89](https://github.com/Rhino-Energy/rhino-frontend/commit/c7faa89316d3a35d8b71e8651181f50bcd9115a5))
* change BASE URL local to prod ([68657df](https://github.com/Rhino-Energy/rhino-frontend/commit/68657dfbdf9dae51c295828f44a04c0c709d0cca))
* change client api route | filters sidebar menu items by user view permission ([3257d18](https://github.com/Rhino-Energy/rhino-frontend/commit/3257d189109ad0dbe255c9e9bb9fb80972bf5226))
* Change dashboard table api request body ([ec6a7a9](https://github.com/Rhino-Energy/rhino-frontend/commit/ec6a7a93f5fef669a75062eece2fbc07ce41c4c1))
* change dashboard table option to another api | improve code readability ([e6717f5](https://github.com/Rhino-Energy/rhino-frontend/commit/e6717f5389988300647ef6aecf564105af9627ef))
* change dashboard table request data value structure ([d49f02b](https://github.com/Rhino-Energy/rhino-frontend/commit/d49f02bafd7ac6500ad1a4c2a7adaec4db12bfaa))
* filter dashboard data based on user ([febdb81](https://github.com/Rhino-Energy/rhino-frontend/commit/febdb812e8b859f74425e540cf67c7ce882176b2))
* Fix api url [PRD-0000] ([8791de3](https://github.com/Rhino-Energy/rhino-frontend/commit/8791de3f8e4f444294988136d5736c53c9be15ba))
* Fix api url [PRD-0000] ([14da3df](https://github.com/Rhino-Energy/rhino-frontend/commit/14da3dfc44444374d2b86e05cb482494ba9ef1b8))
* fix to no active user login ([11805e4](https://github.com/Rhino-Energy/rhino-frontend/commit/11805e41848a1d2ccde566fef5c1da7793be29f6))
* Implement dashboard page ([#24](https://github.com/Rhino-Energy/rhino-frontend/issues/24)) ([6be1cea](https://github.com/Rhino-Energy/rhino-frontend/commit/6be1cea275e304959af8d9caa89d00bb96a3d3f7))
* Implement Dashboard Page [PRD-1386] ([c652c97](https://github.com/Rhino-Energy/rhino-frontend/commit/c652c9741a0e1ba29a1597a148778f062f81eea3))
* implement sidebar menu minimize functionality ([0678be4](https://github.com/Rhino-Energy/rhino-frontend/commit/0678be495439cb7e0aa3643c644c5a2eb091a1f7))
* Implement sidebar minimize option ([b8dfae6](https://github.com/Rhino-Energy/rhino-frontend/commit/b8dfae62a8717cccd0378b5b1bc92aba97a19ec6))
* Implement User type and view permission based dashboard rendering ([0830cf1](https://github.com/Rhino-Energy/rhino-frontend/commit/0830cf1e245994ebd65234be7329c75c16938203))
* rendering side bar item based on role or user type ([94b419c](https://github.com/Rhino-Energy/rhino-frontend/commit/94b419c043ba12563780b863306f19b59b6fd26c))
* rendering sidebar menu based on user type and licences ([542e860](https://github.com/Rhino-Energy/rhino-frontend/commit/542e860db6b48ffcb10da5e86b9ce92523e02c54))
* set dashboard action buttons sticky ([dff2259](https://github.com/Rhino-Energy/rhino-frontend/commit/dff22594434b5fe8c650d431abb5e27c3e04e3f8))
* solve active panel issue ([694098a](https://github.com/Rhino-Energy/rhino-frontend/commit/694098a548338254aa56b844b6d9f8a3780d8321))
* solve active panel issue ([83bdbd2](https://github.com/Rhino-Energy/rhino-frontend/commit/83bdbd27ef1a20b312fe278f8df3fa7102d85c30))


### Bug Fixes

* Don't set cookie in jwt authentication request [PRD-0000] ([#28](https://github.com/Rhino-Energy/rhino-frontend/issues/28)) ([8c0ac13](https://github.com/Rhino-Energy/rhino-frontend/commit/8c0ac133eb917bab4db4978edc17892b7d8796b4))
* Don't set cookie in jwt authentication request [PRD-0000] ([#29](https://github.com/Rhino-Energy/rhino-frontend/issues/29)) ([2c22728](https://github.com/Rhino-Energy/rhino-frontend/commit/2c2272883ec4fd31b2edc6de901cd67a2ac3aa86))
* Don't set cookie in jwt authentication request [PRD-0000] ([#30](https://github.com/Rhino-Energy/rhino-frontend/issues/30)) ([bb35620](https://github.com/Rhino-Energy/rhino-frontend/commit/bb35620c1916b5ca34172782f7b9a91777999344))
* Don't set cookie in jwt authentication request [PRD-0000] ([#31](https://github.com/Rhino-Energy/rhino-frontend/issues/31)) ([a40b243](https://github.com/Rhino-Energy/rhino-frontend/commit/a40b243b04c80d2ce8648d69face04676b245fd0))
* Fix dashboard favorite meter and measurement uuids passing issue [PRD-1386] ([#39](https://github.com/Rhino-Energy/rhino-frontend/issues/39)) ([9778bc2](https://github.com/Rhino-Energy/rhino-frontend/commit/9778bc2d4ea97f04585d06f798ec6ea5eca9b8e2))
* Fix dashboard sorting, select all clients etc issues [PRD-1386] ([445e5c4](https://github.com/Rhino-Energy/rhino-frontend/commit/445e5c4c8a796a8d3cd28c633073f76e8790e155))
* Fix dashboard sorting, select all clients etc issues [PRD-1386] ([a8efed5](https://github.com/Rhino-Energy/rhino-frontend/commit/a8efed58a90570fc89f42fb3e3089dab29fb0922))
* Fix favorite meter overflow issue [PRD-1386] ([b322ca8](https://github.com/Rhino-Energy/rhino-frontend/commit/b322ca83652497f0604f8d6bf6582f992a79e87f))
* Fix favorite meter overflow issue [PRD-1386] ([f867345](https://github.com/Rhino-Energy/rhino-frontend/commit/f867345060b754a5bab54bd18dfb6d4fb472ee56))
* Fix issues in groups and it's loading [PRD-1386] ([#45](https://github.com/Rhino-Energy/rhino-frontend/issues/45)) ([376f7fd](https://github.com/Rhino-Energy/rhino-frontend/commit/376f7fdb841629ee94e300c2f352c5eccdebfdcf))
* Fix location and group Combobox disabled issue [PRD-1386] ([#48](https://github.com/Rhino-Energy/rhino-frontend/issues/48)) ([f9d82b3](https://github.com/Rhino-Energy/rhino-frontend/commit/f9d82b38c702d56761d02f087a08a9ac08ed5958))
* Fix location api not found issue ([4a5a580](https://github.com/Rhino-Energy/rhino-frontend/commit/4a5a580a7b4b8877c428064f10dca8976a17835b))
* Fix location api not found issue ([bdecf35](https://github.com/Rhino-Energy/rhino-frontend/commit/bdecf3584b278a8e51fb68eae414aed14f75a873))
* fix side bar menu item rendering permission issue ([b605c56](https://github.com/Rhino-Energy/rhino-frontend/commit/b605c56ad6d243a51ce42699538fa103354fdf21))
* Fix sidebar Menu not working issue [PRD-1386] ([d9fba07](https://github.com/Rhino-Energy/rhino-frontend/commit/d9fba0708ca69ef7da82ce032bd51c07f6b82ef1))
* Fix sidebar Menu not working issue [PRD-1386] ([26b28da](https://github.com/Rhino-Energy/rhino-frontend/commit/26b28dac925742ccb3ce46f44aa26a4fd0985e9f))
* Fix styling issues [PRD-0000] ([#42](https://github.com/Rhino-Energy/rhino-frontend/issues/42)) ([5cfd1ee](https://github.com/Rhino-Energy/rhino-frontend/commit/5cfd1ee7052a1e63f86aa402abcb0b3dd14a942d))
* Fix top ribbon autofocus issue [PRD-1386] ([fc0c3ef](https://github.com/Rhino-Energy/rhino-frontend/commit/fc0c3eff3e0e60221ed4e1391f04cc9536ae0760))
* Fix top ribbon autofocus issue [PRD-1386] ([ebebadd](https://github.com/Rhino-Energy/rhino-frontend/commit/ebebadd6edb87c16fc84a76134fe1b5ab1732057))
* Refactor code to separet APIs [PRD-0000] ([#43](https://github.com/Rhino-Energy/rhino-frontend/issues/43)) ([d401bf5](https://github.com/Rhino-Energy/rhino-frontend/commit/d401bf5fbd5c84fc2680eb98090c4288af9bcc26))
* Refactor code to use API's package [PRD-1386] ([#44](https://github.com/Rhino-Energy/rhino-frontend/issues/44)) ([fd75fb3](https://github.com/Rhino-Energy/rhino-frontend/commit/fd75fb36795309715aec0946ea9b60b4d34831f3))
* Remove unwanted filters [PRD-1386] ([#46](https://github.com/Rhino-Energy/rhino-frontend/issues/46)) ([d99f7b0](https://github.com/Rhino-Energy/rhino-frontend/commit/d99f7b0e507819db079e2a4ca0e7f4fd38c467d4))

## [1.3.0](https://github.com/Rhino-Energy/rhino-frontend/compare/webapp-v1.2.0...webapp-v1.3.0) (2024-10-30)


### Features

* Fix webapp name in release step [PRD-1409] ([#20](https://github.com/Rhino-Energy/rhino-frontend/issues/20)) ([3352b30](https://github.com/Rhino-Energy/rhino-frontend/commit/3352b30479439d818ff41bb0738cd399b772be19))

## [1.2.0](https://github.com/Rhino-Energy/rhino-frontend/compare/webapp-v1.1.0...webapp-v1.2.0) (2024-10-30)


### Features

* Print logs in release PR step [PRD-1409] ([#18](https://github.com/Rhino-Energy/rhino-frontend/issues/18)) ([f55f43d](https://github.com/Rhino-Energy/rhino-frontend/commit/f55f43d91cfb7871f26f1863c452f1ab3109351c))

## [1.1.0](https://github.com/Rhino-Energy/rhino-frontend/compare/webapp-v1.0.0...webapp-v1.1.0) (2024-10-30)


### Features

* Add trigger release file for initiating release [PRD-1409] ([#16](https://github.com/Rhino-Energy/rhino-frontend/issues/16)) ([7ad9390](https://github.com/Rhino-Energy/rhino-frontend/commit/7ad9390d311a4e3b80597df06fbaaab9b90a9fff))

## 1.0.0 (2024-10-29)


### Features

* Add readme and update ngnix conf [PRD-1409] ([#10](https://github.com/Rhino-Energy/rhino-frontend/issues/10)) ([2bfb2d5](https://github.com/Rhino-Energy/rhino-frontend/commit/2bfb2d5cfe015782f84eaebcef673bac46bcbb33))
* Initial commit [PRD-1408] ([b26d0e0](https://github.com/Rhino-Energy/rhino-frontend/commit/b26d0e02f5a910143fb757a93135277c5e91f319))
* Setup ci/cd for webapp [PRD-1409] ([#1](https://github.com/Rhino-Energy/rhino-frontend/issues/1)) ([d84ac00](https://github.com/Rhino-Energy/rhino-frontend/commit/d84ac00da40b217fad59f18ba8a6a2e50d1a2f6f))


### Bug Fixes

* Fix issues in nginx conf [PRD-1409] ([#12](https://github.com/Rhino-Energy/rhino-frontend/issues/12)) ([41b76d8](https://github.com/Rhino-Energy/rhino-frontend/commit/41b76d82b1a330b6b167fb0bcb8078596cbc0b68))
* Fix issues in nginx conf file [PRD-1409] ([#13](https://github.com/Rhino-Energy/rhino-frontend/issues/13)) ([601d0fb](https://github.com/Rhino-Energy/rhino-frontend/commit/601d0fbf952de6ac9d1a9076e1e3e2c853e48ca8))
* Fix issues in nginx conf file [PRD-1409] ([#14](https://github.com/Rhino-Energy/rhino-frontend/issues/14)) ([7c9dd96](https://github.com/Rhino-Energy/rhino-frontend/commit/7c9dd96393c4b9fe54de509dde545c159e771046))
* Fix issues related to nginx conf [PRD-1409] ([#11](https://github.com/Rhino-Energy/rhino-frontend/issues/11)) ([207e9b2](https://github.com/Rhino-Energy/rhino-frontend/commit/207e9b2419058cf7a2aaf2411ed3bf1b6bd6b7db))
* Fix ngnix and build path [PRD-1409] ([#9](https://github.com/Rhino-Energy/rhino-frontend/issues/9)) ([77733c3](https://github.com/Rhino-Energy/rhino-frontend/commit/77733c36ef530c7a11d1d7a173c80ed57a050c05))
