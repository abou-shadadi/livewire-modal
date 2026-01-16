# Livewire Modal

[![Latest Version on Packagist](https://img.shields.io/packagist/v/devsrv/livewire-modal.svg?style=flat-square)](https://packagist.org/packages/devsrv/livewire-modal)
[![Total Downloads](https://img.shields.io/packagist/dt/devsrv/livewire-modal.svg?style=flat-square)](https://packagist.org/packages/devsrv/livewire-modal)

Turn Laravel Livewire Component into Modal.

<img src="https://staging.voyantcs.com/sourav/static/livewire-modal-sample-alt.gif" width="720" />

## 🏷 Features
- Modal triggered by javascript i.e. opens instantly without waiting for livewire network round trip to finish ( no laggy feeling )
- Skeleton loading indicator 
- Support alert message ( info, warning, success, danger ) 
- Trigger from Alpine Component / Vanilla JS / Livewire Class Component

## 🧾 Requirements

| **Bootstrap**  | 4 or 5 | *no bootstrap support coming soon*
|---|---|---|
| Jquery  |   | *for bootstrap 4 only* 
|  Laravel | >= 7 |   |
|  Livewire | >= 3.0  |   |
|  Alpine JS | >= 3.0  |   |


## 📥 Installation

```shell
composer require devsrv/livewire-modal
```

#### Installing from Git (dev-master)

If you're using a fork / VCS repository, add it to your application's `composer.json`:

```json
{
  "repositories": [
    {
      "type": "vcs",
      "url": "https://github.com/abou-shadadi/livewire-modal"
    }
  ],
  "require": {
    "devsrv/livewire-modal": "dev-master"
  }
}
```

#### Include the base modal component
```html
<html>
<head>
    ...
    @livewireStyles
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
</head>
<body>
    ...
    <x-livewiremodal-base /> 👈
    @livewireScripts
</body>
</html>
```

#### Publish assets
```shell
php artisan vendor:publish --provider="devsrv\LivewireModal\LivewireModalServiceProvider" --tag=livewiremodal-assets
```

#### Publish config
```shell
php artisan vendor:publish --provider="devsrv\LivewireModal\LivewireModalServiceProvider" --tag=config
```
> config support bootstrap theme: bs4 | bs5
 
### 📌 Updating
> **Important:** when updating the package make sure to re-publish the assets with `--force` flag
```shell
php artisan vendor:publish --provider="devsrv\LivewireModal\LivewireModalServiceProvider" --tag=livewiremodal-assets --force
```


## ⚗️ Usage
### <img src="https://laravel-livewire.com/favicon.ico" width="20" /> Create Livewire Component 
No consideration required, create livewire component as usual. Use livewire's `mount` to handle passed parameters

### ✨ Open Modal

###### ✔️ From Alpine Component
```html
<div x-data>
  <button type="button" x-on:click='$dispatch("open-x-modal", {
    title: "Heading Title",
    modal: "livewire-component-name",
    size: "xl",
    args: {{ json_encode($data_array) }}
  })'>open
  </button>
</div>
```

###### ✔️ Via Vanilla JS

```html
<button type="button" onclick='_openModal("Heading", "component-name", {{ json_encode($data) }}, "sm")'>
  open
</button>
```


###### ✔️ Via Trigger Blade Component

```html
<x-livewiremodal-trigger class="btn" 
	title="Modal Heading"
	modal="component-name"
   :args="['sky' => 'blue', 'moon' => 1]" 
   lg>open
</x-livewiremodal-trigger>
```

###### ✔️ From Livewire Class

```php
$this->dispatch('open-x-modal', title: 'My Modal', modal: 'product.order', args: ['id' => 1, 'rate' => 20]);
```

> 💡 Modal size supports `sm` `lg` `xl`        *// completely optional*

## 🌈 Bonus
you are free to put content in livewire view file in any structure, however the package provides an blade component for bootstrap modal which you can use as:

```html
<x-livewiremodal-modal>
    <div class="row">
        ...
    </div>
    ...

    <x-slot name="footer">
        ...
        <button type="button" class="..">Save</button>
    </x-slot>
</x-livewiremodal-modal>
```

#### ✌🏼 Two reasons to use this component

🟢 a pretty line progress loading indicator which appears in the top when livewire loading state changes

🟢 alert notification message which can be triggered by: 
```php 
$this->info('<strong>Hi !</strong>, i am an alert');  // support `info` `warning` `success` `danger`
```

## Customization

#### Customize the modal content (recommended)

The modal renders your target Livewire component, so you can design your modal UI in your component view however you like.

Optionally, you can use the provided UI wrapper component for a Bootstrap-friendly structure:

```html
<x-livewiremodal-modal>
    ...

    <x-slot name="footer">
        <button type="button" class="btn btn-primary">Save</button>
    </x-slot>
</x-livewiremodal-modal>
```

#### Customize the modal shell/layout (override package views)

If you want to customize the Bootstrap modal container markup (header/footer/layout/loading UI/assets inclusion), override the package views by creating files under:

`resources/views/vendor/livewiremodal/...`

Examples:

- Override `livewiremodal::components.modal-base`:
  - create `resources/views/vendor/livewiremodal/components/modal-base.blade.php`
- Override `livewiremodal::components.ui.modal`:
  - create `resources/views/vendor/livewiremodal/components/ui/modal.blade.php`

Laravel will automatically use your overridden views instead of the package views.

## Troubleshooting

#### `Loading failed for the <script> ... /vendor/livewiremodal/js/script.min.js`

This means the package assets are not published to your app's `public/` directory.

```shell
php artisan vendor:publish --provider="devsrv\LivewireModal\LivewireModalServiceProvider" --tag=livewiremodal-assets --force
```

After publishing, these files should exist:

- `public/vendor/livewiremodal/js/script.min.js`
- `public/vendor/livewiremodal/css/skeleton.min.css`

#### `Alpine Expression Error: _livewireModal is not defined`

This usually happens when the script above failed to load (404).

Also confirm:

- Your page includes AlpineJS (v3 recommended)
- Your page includes Bootstrap JS (and jQuery if you're using Bootstrap 4)


## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

## 👋🏼 Say Hi! 
Leave a ⭐ if you find this package useful 👍🏼,
don't forget to let me know in [Twitter](https://twitter.com/srvrksh)  
