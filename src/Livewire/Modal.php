<?php

namespace devsrv\LivewireModal\Livewire;

use Livewire\Component;

class Modal extends Component
{
    public $activeModal = null;
    public $args = [];

    // Listeners for Livewire events
    protected $listeners = ['initModal', 'closeModal'];

    // Initialize the modal with a specific name and arguments
    public function initModal($modal, $args = []) {
        $this->activeModal = $modal;
        $this->args = $args;
        // Use dispatch() method for Livewire 3 to send an event to the frontend
      //  $this->dispatchBrowserEvent('modal-ready', ['modal' => $modal]);

    }

    // Close the modal and reset its properties
    public function closeModal() {
        $this->reset(['activeModal', 'args']);
    }

    // Render the modal view
    public function render()
    {
        return view('livewiremodal::livewire.modal');
    }
}
