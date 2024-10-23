<div>
    @php
        $key = Str::uuid() . '-' . $activeModal;
    @endphp
    <div wire:key="x--modal-zone-{{ $key }}">
        @if ($activeModal)
            <livewire:is :component="$activeModal" :args="$args" :key="$key" />
        @else
            <p>No active modal</p>
        @endif
    </div>
</div>
