function _livewireModal() {
    return {
        ready: false,
        modal: null,
        size: null,
        position: 'top',
        effect: null,
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

                // Try to reset the base-wire-modal component
                try {
                    Livewire.find('base-wire-modal').resetPage();
                } catch (e) {
                    console.warn('livewiremodal: Livewire.find failed, doing manual cleanup', e);
                }

                // Aggressive cleanup: remove any Livewire wire:loading/click-block elements
                document.querySelectorAll('[wire\\:loading], [wire\\:click]').forEach(el => el.remove());

                // Remove any Livewire overlay that blocks clicks
                document.querySelectorAll('[data-lw], [wire\\:initial-data]').forEach(el => el.remove());

                // Remove any leftover modal-backdrops
                document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());

                // Replace modal container HTML to clear any leftover Livewire state
                const modalContent = modalElement.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.outerHTML = `
                        <div class="modal-header align-items-center">
                            <div class="d-flex align-items-center">
                                <h5 class="modal-title"></h5>
                            </div>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body"></div>
                        <div class="d-flex modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    `;
                }

                this.ready = false;
            };

            if (_livewiremodal.theme === 'bs5') {
                document.getElementById('x-modal').addEventListener('hidden.bs.modal', () => modalClose());
            } else if (_livewiremodal.theme === 'bs4') {
                $('#x-modal').on('hidden.bs.modal', () => modalClose());
            }

            // Listen for programmatic close
            window.addEventListener('close-x-modal', (e) => {
                console.log('livewiremodal: close-x-modal received', e);
                modalClose();
            });
        },
        onOpen(event) {
            const detail = Array.isArray(event.detail) ? event.detail[0] : event.detail;
            // Remove any existing backdrops before showing a new modal to avoid duplication
            document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
                backdrop.remove();
            });

            this.heading = detail.title;
            this.modal = detail.modal;
            this.size = detail.size || null;
            this.position = detail.position || 'top';
            this.effect = detail.effect || null;
            this.ready = false;

            if(_livewiremodal.theme === 'bs4') {
                $('#x-modal').modal('show');
            } else if(_livewiremodal.theme === 'bs5') {
                new bootstrap.Modal(document.getElementById('x-modal')).show();
            }

            Livewire.dispatch('initModal', {
                component: 'base-wire-modal',
                modal: detail.modal,
                size: detail.size,
                args: detail.args
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

