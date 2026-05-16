import pandas as pd

def calculate_batting_stats(innings_data):
    """
    Calculates batting statistics for a given innings.
    Returns a list of player batting stats.
    """
    stats = {}
    
    for over_data in innings_data.get('overs', []):
        for delivery in over_data.get('deliveries', []):
            batter = delivery.get('batter')
            runs = delivery.get('runs', {}).get('batter', 0)
            
            if batter not in stats:
                stats[batter] = {
                    'name': batter,
                    'runs': 0,
                    'balls': 0,
                    'fours': 0,
                    'sixes': 0,
                    'strike_rate': 0
                }
            
            stats[batter]['runs'] += runs
            # Count ball if it's not a wide (simplified)
            extras = delivery.get('extras', {})
            if 'wides' not in extras:
                stats[batter]['balls'] += 1
            
            if runs == 4:
                stats[batter]['fours'] += 1
            elif runs == 6:
                stats[batter]['sixes'] += 1

    for batter in stats:
        if stats[batter]['balls'] > 0:
            stats[batter]['strike_rate'] = round((stats[batter]['runs'] / stats[batter]['balls']) * 100, 2)
        else:
            stats[batter]['strike_rate'] = 0
            
    return list(stats.values())
