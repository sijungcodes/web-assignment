    <!DOCTYPE html>
    <html lang="{{ app()->getLocale() }}">
    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Books and authors</title>
        <link rel="stylesheet" href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css" />

    </head>
    <body>
        <div id="app"></div>
        <script type="text/javascript" src="{{ asset('js/app.js') }}"></script>
    </body>
    </html>