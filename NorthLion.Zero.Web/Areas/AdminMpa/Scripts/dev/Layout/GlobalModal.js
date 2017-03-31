//El Peri!
export class PeriModalManager {
    constructor(modalContainer = "#modal") {
        this.modal = modalContainer;

        this.listener = () => {
            $(this.modal).on("hidden.bs.modal", () => {
                console.info("Modal closed");
                this.onClose = null;
                $(this.modal).empty();
            });
        }
        this.listener();
    }
    setContainer(container) {
        this.modal = container;
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
            this.onClose(data);
            this.onClose = null;
        }
    }
    /**
     * 
     * @param {function} onclose sets the onClose function 
     */
    setOnClose(onclose) {
        this.onClose = onclose;
    }
    getInstance() {
        return $(modal);
    }
};
