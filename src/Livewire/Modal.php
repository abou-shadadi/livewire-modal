<?php

namespace devsrv\LivewireModal\Livewire;

use Livewire\Component;
use Livewire\Attributes\On;
class Modal extends Component

{
    public $activeModal = null;
    public $args = []; // Declare args as a public property

    #[On('initModal')]
    public function initModal($modal, $args = [])
    {
        $this->activeModal = $modal;
        $this->args = $args;
        // Trigger the modal ready event if needed
        $this->dispatch('modal-ready', ['modal' => $modal]);
    }


    // Method to close the modal and reset properties
    #[On('close-modal')]
    public function closeModal()
    {
        $this->activeModal = null;
        $this->args = [];
        $this->reset(['activeModal', 'args']);
    }

    public function render()
    {
        // Render the modal view
        return view('livewiremodal::livewire.modal');
    }
}
