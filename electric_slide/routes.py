def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('data', '/data')
    config.add_route('about', '/about')
    config.add_route('states-data', '/api/data/states')
    config.add_route('solving-data', '/api/data/solve')
