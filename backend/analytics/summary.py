from .batting import calculate_batting_stats
from .bowling import calculate_bowling_stats
from .momentum import calculate_momentum
from .partnerships import calculate_partnerships

def generate_match_summary(match_data):
    """
    Main entry point for the Deterministic Analytics Engine.
    Processes the raw JSON and returns a structured summary.
    """
    info = match_data.get('info', {})
    innings = match_data.get('innings', [])
    
    summary = {
        'match_info': {
            'teams': info.get('teams'),
            'venue': info.get('venue'),
            'city': info.get('city'),
            'toss': info.get('toss'),
            'outcome': info.get('outcome'),
            'player_of_match': info.get('player_of_match')
        },
        'innings': []
    }
    
    for inn in innings:
        team_name = inn.get('team')
        batting_stats = calculate_batting_stats(inn)
        bowling_stats = calculate_bowling_stats(inn)
        momentum = calculate_momentum(inn)
        partnerships = calculate_partnerships(inn)
        
        summary['innings'].append({
            'team': team_name,
            'batting': batting_stats,
            'bowling': bowling_stats,
            'momentum': momentum,
            'partnerships': partnerships,
            'total_score': momentum[-1]['cumulative_runs'] if momentum else 0,
            'total_wickets': momentum[-1]['total_wickets'] if momentum else 0
        })
        
    return summary
