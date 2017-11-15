# from pyramid.response import Response
from pyramid.view import view_config
import json




@view_config(route_name='home', renderer='electric_slide:/templates/index.jinja2')
def home_view(request):
    return {}


@view_config(route_name='data', renderer='electric_slide:/templates/data.jinja2')
def data_view(request):
    return {}


@view_config(route_name='about', renderer='electric_slide:/templates/about.jinja2')
def about_view(request):
    return {}


@view_config(route_name='states-data', renderer='json')
def states_data_json(request):
    """Send the count of the number of states in each complexity."""
    with open('electric_slide/data/state_almanac_data.json') as f:
        all_states = json.load(f)
    all_val = list(all_states.values())
    return {c: all_val.count(c) for c in range(max(all_val) + 1)}


@view_config(route_name='solving-data', renderer='json')
def solving_data_json(request):
    """Send all the historical data of each algorithm solving all complexities."""
    with open('electric_slide/data/tree_data.json') as f:
        tree_data = json.load(f)
    with open('electric_slide/data/a_star_data.json') as f:
        a_star_data = json.load(f)
    with open('electric_slide/data/greedy_data.json') as f:
        greedy_data = json.load(f)
    solving_data = {}
    for complexity in tree_data:
        solving_data[complexity] = {
            'tree': {
                'time': tree_data[complexity]['time'],
                'moves': tree_data[complexity]['moves']
            },
            'a_star': {
                'time': a_star_data[complexity]['time'],
                'moves': a_star_data[complexity]['moves']
            },
            'greedy': {
                'time': greedy_data[complexity]['time'],
                'moves': greedy_data[complexity]['moves']
            }
        }
    return solving_data
