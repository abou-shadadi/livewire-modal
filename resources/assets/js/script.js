function _livewireModal() {
    return {
        ready: false,
        modal: '',
        size: null,
        heading: 'loading . . .',
        boot() {
            const modalClose = () => {
                const modalElement = document.getElementById('x-modal');

                // Ensure no duplicate backdrops remain by disposing of the modal instance
                if (_livewiremodal.theme === 'bs5') {
                    const modalInstance = bootstrap.Modal.getInstance(modalElement);
                    if (modalInstance) {
                        modalInstance.hide();
                        modalInstance.dispose();
                    }
                } else if (_livewiremodal.theme === 'bs4') {
                    $('#x-modal').modal('hide');
                }

                // Remove any remaining backdrop
                document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
                    backdrop.remove();
                });

                // Dispatch the Livewire event for modal close
                Livewire.dispatch('close-modal', { component: 'base-wire-modal' });
                this.ready = false;
            };

            if (_livewiremodal.theme === 'bs5') {
                document.getElementById('x-modal').addEventListener('hidden.bs.modal', () => modalClose());
            } else if (_livewiremodal.theme === 'bs4') {
                $('#x-modal').on('hidden.bs.modal', () => modalClose());
            }
        },
        onOpen(event) {
            // Remove any existing backdrops before showing a new modal to avoid duplication
            document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
                backdrop.remove();
            });

            this.heading = event.detail.title;
            this.modal = event.detail.modal;
            this.size = Object.prototype.hasOwnProperty.call(event.detail, 'size') ? event.detail.size : null;
            this.ready = false;

            if (_livewiremodal.theme === 'bs4') {
                $('#x-modal').modal('show');
            } else if (_livewiremodal.theme === 'bs5') {
                const modalElement = document.getElementById('x-modal');
                const modalInstance = new bootstrap.Modal(modalElement, {
                    backdrop: true, // or 'static' depending on desired behavior
                    keyboard: true
                });
                modalInstance.show();
            }

            // Livewire.dispatch('initModal', {
            //     component: 'base-wire-modal',
            //     modal: event.detail.modal,
            //     args: event.detail.args
            // });

            // Livewire.emitTo('base-wire-modal', 'initModal', event.detail.modal, event.detail.args);
            Livewire.dispatchTo('base-wire-modal', 'initModal', {
                modal: event.detail.modal,
                args: event.detail.args
            });
            
                     
        }
    };
}

function _openModal(title, modal, params = [], size = null) {
    window.dispatchEvent(new CustomEvent('open-x-modal', {
        detail: {
            title: title,
            modal: modal,
            size: size,
            args: params
        }
    }));
}
