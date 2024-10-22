<div wire:key="x--modal-zone-{{ $activeModal }}">
    @if($activeModal)
        <livewire:{{ $activeModal }} :args="$args" :key="md5($activeModal . serialize($args))" />
    @else
        <p>No active modal</p>
    @endif
</div>
