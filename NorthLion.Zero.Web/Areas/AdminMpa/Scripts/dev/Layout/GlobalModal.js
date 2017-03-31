//El Peri!
export class PeriModalManager {
    constructor(modalContainer = "#modal") {
        this.modal = modalContainer;
    }
    /**
     * Opens the modal with the specified parameters
     */
    open(url, onload) {
        let $modal = $(modal).load(url, () => {
            $(modal).modal("show");
            onload();
        });
    }
    /**
     * Closes the current modal instance
     * @param {Any} data Data to be send when the modal is closed 
     */
    close(data) {

        if (!this.onClose) {
            throw new Error("On close function not defined");
        }
        else {
            $(modal).modal("hide");
            this.onClose();
            this.onClose = null;
        }
    }
    setOnClose(onclose) {
        this.onClose = onclose;
    }
    dismiss(data) {

    }
    getInstance() {
        return $(modal);
    }
};
