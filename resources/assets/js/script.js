function _livewireModal() {
    return {
        ready: false,
        modal: '',
        size: null,
        heading: 'loading . . .',
        boot() {
            const modalClose = () => {
                Livewire.dispatch('close-modal', { component: 'base-wire-modal' }); // Livewire 3 uses dispatch
                this.ready = false;
            };

            if (_livewiremodal.theme === 'bs5') {
                document.getElementById('x-modal').addEventListener('hidden.bs.modal', () => modalClose());
            } else if (_livewiremodal.theme === 'bs4') {
                $('#x-modal').on('hidden.bs.modal', () => modalClose());
            }
        },
        onOpen(event) {
            this.heading = event.detail.title;
            this.modal = event.detail.modal;
            this.size = event.detail.size || null;
            this.ready = false;

            if (_livewiremodal.theme === 'bs4') {
                $('#x-modal').modal('show');
            } else if (_livewiremodal.theme === 'bs5') {
                new bootstrap.Modal(document.getElementById('x-modal')).show();
            }

            Livewire.dispatch('init-modal', { // Livewire 3 uses dispatch
                component: 'base-wire-modal',
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
