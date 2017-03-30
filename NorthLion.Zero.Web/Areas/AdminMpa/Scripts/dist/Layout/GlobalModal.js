'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var modal;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export('modal', modal = function modal(container, options) {
                _classCallCheck(this, modal);

                var modalTypes = {
                    MODAL_CANCEL: 'MODAL_CANCEL'
                };
                var modalConfig = {
                    show: true,
                    backdrop: 'static',
                    keyboard: false
                };
                var modalInstance = {};
                modalInstance.modalCloseEvent = {};
                var selfModal = this;
                if (container) {
                    var isJquery = container instanceof $;
                    if (isJquery) {
                        selfModal.container = container;
                    } else {
                        selfModal.container = $(container);
                    }
                } else {
                    selfModal.container = $('#modal');
                }

                selfModal.initModal = function () {
                    selfModal.container.modal(modalConfig);
                };
                modalInstance.open = function (url, data) {
                    if (url) {
                        options.loadingFunc();
                        selfModal.container.load(url, data, function (response, status, xhr) {
                            if (status == "error") {
                                options.onErrorFunction();
                                options.loadEndFunc();
                            } else {
                                options.loadEndFunc();
                                selfModal.initModal();
                            }
                        });
                    }
                };
                modalInstance.close = function (data, modalType) {

                    selfModal.container.modal('hide');
                    data.modalType = modalType;
                    var modalCloseEvent = new CustomEvent('modalClose', {
                        detail: {
                            info: data
                        },
                        bubbles: true,
                        cancelable: false
                    });
                    document.dispatchEvent(modalCloseEvent);
                };
                modalInstance.sendCloseEvent = function (data, modalType) {
                    data.modalType = modalType;
                    var modalCloseEvent = new CustomEvent('modalClose', {
                        detail: {
                            info: data
                        },
                        bubbles: true,
                        cancelable: false
                    });
                    document.dispatchEvent(modalCloseEvent);
                };
                modalInstance.openInBody = function (url, data) {
                    if (url) {
                        options.loadingFunc();
                        selfModal.container.load(url, data, function (response, status, xhr) {
                            if (status == "error") {
                                options.onErrorFunction();
                                options.loadEndFunc();
                            } else {
                                options.loadEndFunc();
                                selfModal.initModal();
                            }
                        });
                    }
                };
                function initListener() {
                    var _this = this;

                    $('body').on('click', '[data-modal]', function (e) {
                        var button = $(_this);
                        e.preventDefault();
                        var url = $(_this).data('url') || $(_this).attr('href');
                        if (url) {
                            options.loadingFunc(button);
                            selfModal.container.load(url, function (response, status, xhr) {
                                if (status == "error") {
                                    options.loadEndFunc();

                                    options.onErrorFunction("Sorry but there was an error: " + xhr.status + " " + xhr.statusText);
                                } else {
                                    options.loadEndFunc();
                                    selfModal.initModal();
                                }
                            });
                        }
                    });
                    $('body').on('click', '[data-cancel]', function (e) {
                        e.preventDefault();
                        modalInstance.close({}, modalTypes.MODAL_CANCEL);
                    });
                }

                initListener();
                return modalInstance;
            });

            _export('modal', modal);

            ;
        }
    };
});