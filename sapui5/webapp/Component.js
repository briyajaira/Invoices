// @ts-nocheck
sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "logaligroup/sapui5/model/models",
    "sap/ui/model/resource/ResourceModel",
    "./controller/HelloDialog"
],

    /**
         * @param {typeof sap.ui.core.UIComponent} UIComponent
         * @param {typeof sap.ui.Device} Device
         * @param {sap.ui.model.resource.ResourceModel} ResourceModel
         */

    function (UIComponent, Device, models, ResourceModel, HelloDialog) {

        return UIComponent.extend("logaligroup.sapui5.Component", {

            metadata: {
                manifest: "json"
                //            "rootView": {
                //                "viewName": "logaligroup.sapui5.view.App",
                //                "type": "XML",
                //                "async": true,
                //                "id": "App"
                //            }
            },

            init: function () {
                //call the init function of the parent
                UIComponent.prototype.init.apply(this, arguments);

                // Set data Model on the view    
                this.setModel(models.createRecipient());

                // Set i18n model on then view      
                //    var i18nModel = new ResourceModel({ bundleName: "logaligroup.sapui5.i18n.i18n" });
                //    this.setModel(i18nModel, "i18n");

                //set the device model
                this.setModel(models.createDeviceModel(), "device");

                this._helloDialog = new HelloDialog(this.getRootControl());

                //create the views based on the url/hash
                this.getRouter().initialize();

            },

            exit: function () {
                this._helloDialog.destroy();
                delete this._helloDialog;
            },

            openHelloDialog: function () {
                this._helloDialog.open();
            },

            getContentDensityClass: function () {
                if (!Device.support.touch) {
                    this._sContentDensityClass = "sapUiSizeCompact"
                } else {
                    this._sContentDensityClass = "sapUiSizeCozy"
                }
                return this._sContentDensityClass;
            }

        });

    });