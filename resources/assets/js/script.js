function _livewireModal() {
    return {
        ready: false,
        modal: '',
        size: null,
        heading: 'loading . . .',
        boot() {
            const modalClose = () => {
                const modalElement = document.getElementById('x-modal');
                if (_livewiremodal.theme === 'bs5') {
                    const modalInstance = bootstrap.Modal.getInstance(modalElement);
                    if (modalInstance) {
                        modalInstance.hide();  // Properly hide the modal
                    }
                } else if (_livewiremodal.theme === 'bs4') {
                    $('#x-modal').modal('hide');
                }

                // Remove lingering backdrops in Bootstrap 5
                document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
                    backdrop.remove();
                });

                // Dispatch event to Livewire to handle closing the modal
                Livewire.dispatch('close-modal', { component: 'base-wire-modal' });
                this.ready = false;
            };

            if (_livewiremodal.theme === 'bs5') {
                document.getElementById('x-modal').addEventListener('hidden.bs.modal', (e) => modalClose());
            } else if (_livewiremodal.theme === 'bs4') {
                $('#x-modal').on('hidden.bs.modal', (e) => modalClose());
            }
        },
        onOpen(event) {
            this.heading = event.detail.title;
            this.modal = event.detail.modal;
            this.size = Object.prototype.hasOwnProperty.call(event.detail, 'size') ? event.detail.size : null;
            this.ready = false;

            if (_livewiremodal.theme === 'bs4') {
                $('#x-modal').modal('show');
            } else if (_livewiremodal.theme === 'bs5') {
                const modalElement = document.getElementById('x-modal');
                const modalInstance = new bootstrap.Modal(modalElement, {
                    backdrop: false, // Set to `false` to remove the backdrop
                    keyboard: true // Enable keyboard interaction (ESC key)
                });
                modalInstance.show();
            }

            Livewire.dispatch('init-modal', {
                component: 'base-wire-modal',
                modal: event.detail.modal,
                args: event.detail.args
            });
        }
    }
}
