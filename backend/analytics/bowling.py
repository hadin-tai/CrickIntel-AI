def calculate_bowling_stats(innings_data):
    """
    Calculates bowling statistics for a given innings.
    Returns a list of player bowling stats.
    """
    stats = {}
    
    for over_data in innings_data.get('overs', []):
        for delivery in over_data.get('deliveries', []):
            bowler = delivery.get('bowler')
            runs_total = delivery.get('runs', {}).get('total', 0)
            # Wides and No-balls are extras but counted against bowler in some formats
            # For simplicity, we count total runs except byes/leg-byes
            extras = delivery.get('extras', {})
            bowler_runs = runs_total - extras.get('byes', 0) - extras.get('legbyes', 0)
            
            if bowler not in stats:
                stats[bowler] = {
                    'name': bowler,
                    'overs': 0,
                    'balls': 0,
                    'runs': 0,
                    'wickets': 0,
                    'economy': 0
                }
            
            stats[bowler]['runs'] += bowler_runs
            
            # Count ball if not wide or no-ball
            if 'wides' not in extras and 'noballs' not in extras:
                stats[bowler]['balls'] += 1
            
            # Count wickets (excluding run outs)
            if 'wickets' in delivery:
                for wicket in delivery['wickets']:
                    if wicket.get('kind') not in ['run out', 'retired hurt', 'obstructing the field']:
                        stats[bowler]['wickets'] += 1

    for bowler in stats:
        balls = stats[bowler]['balls']
        overs = (balls // 6) + (balls % 6) / 10
        stats[bowler]['overs'] = overs
        
        if balls > 0:
            stats[bowler]['economy'] = round((stats[bowler]['runs'] / balls) * 6, 2)
        else:
            stats[bowler]['economy'] = 0
            
    return list(stats.values())
