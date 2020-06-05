import $ from 'jquery';

class Modal{
    constructor(){
        this.modalTrigger = $('.open-modal');
        this.closeButton = $('.modal__close');
        this.modal = $('.modal');
        this.events();
    }
    events(){
        // select the modal buttons 
        this.modalTrigger.click(this.openModal.bind(this));
        // select the close modal button
        this.closeButton.click(this.closeModal.bind(this));
        // detect the "ESC" key
        $(document).keyup(this.keyPressHandler.bind(this));
    }

    keyPressHandler(e) {
        if (e.keyCode == 27) {
            this.closeModal();
        }
    }

    openModal(){
        this.modal.addClass('modal__is-visible');
        return false;
    }

    closeModal(){
        this.modal.removeClass('modal__is-visible');
    }
}

export default Modal;