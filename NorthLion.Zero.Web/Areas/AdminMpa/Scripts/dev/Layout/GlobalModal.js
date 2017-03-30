//El Peri!
export class modal {
    constructor(container, options) {
        let modalTypes = {
            MODAL_CANCEL: 'MODAL_CANCEL'
        }
        let modalConfig = {
            show: true,
            backdrop: 'static',
            keyboard: false
        }
        let modalInstance = {};
        modalInstance.modalCloseEvent = {
        };
        let selfModal = this;
        if (container) {
            let isJquery = container instanceof $;
            if (isJquery) {
                selfModal.container = container;
            } else {
                selfModal.container = $(container);
            }
        } else {
            selfModal.container = $('#modal');
        }

        selfModal.initModal = () => {
            selfModal.container.modal(modalConfig);
        }
        modalInstance.open = (url, data) => {
            if (url) {
                options.loadingFunc();
                selfModal.container.load(url, data, (response, status, xhr) => {
                    if (status == "error") {
                        options.onErrorFunction();
                        options.loadEndFunc();
                    } else {
                        options.loadEndFunc();
                        selfModal.initModal();
                    }
                });
            }
        }
        modalInstance.close = (data, modalType) => {

            selfModal.container.modal('hide');
            data.modalType = modalType;
            let modalCloseEvent = new CustomEvent('modalClose', {
                detail: {
                    info: data
                },
                bubbles: true,
                cancelable: false
            });
            document.dispatchEvent(modalCloseEvent);
        }
        modalInstance.sendCloseEvent = (data, modalType) => {
            data.modalType = modalType;
            let modalCloseEvent = new CustomEvent('modalClose', {
                detail: {
                    info: data
                },
                bubbles: true,
                cancelable: false
            });
            document.dispatchEvent(modalCloseEvent);
        }
        modalInstance.openInBody = (url, data) => {
            if (url) {
                options.loadingFunc();
                selfModal.container.load(url, data, (response, status, xhr) => {
                    if (status == "error") {
                        options.onErrorFunction();
                        options.loadEndFunc();
                    } else {
                        options.loadEndFunc();
                        selfModal.initModal();
                    }
                });
            }
        }
        function initListener() {
            $('body').on('click', '[data-modal]', (e) => {
                let button = $(this);
                e.preventDefault();
                let url = $(this).data('url') || $(this).attr('href');
                if (url) {
                    options.loadingFunc(button);
                    selfModal.container.load(url, (response, status, xhr) => {
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
            $('body').on('click', '[data-cancel]', (e) => {
                e.preventDefault();
                modalInstance.close({
                }, modalTypes.MODAL_CANCEL);
            });
        }

        initListener();
        return modalInstance;
    }
};
