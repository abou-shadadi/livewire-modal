<<div>
    @php
        $key = Str::uuid() . '-' . $activeModal;
    @endphp
    <div wire:key="x--modal-zone-{{ $key }}">
        @if ($activeModal)
            <livewire:is :component="$activeModal" :key="$key"
                @foreach ($args as $argKey => $argValue)
                    :{{ $argKey }}="$argValue"
                @endforeach
            />
        @else
            <p>No active modal</p>
        @endif
    </div>
</div>
