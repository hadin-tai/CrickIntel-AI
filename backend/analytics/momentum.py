def calculate_momentum(innings_data):
    """
    Calculates momentum shifts over the course of an innings.
    Returns a list of data points (over, runs, wickets, cumulative_runs).
    """
    momentum = []
    cumulative_runs = 0
    total_wickets = 0
    
    for over_idx, over_data in enumerate(innings_data.get('overs', [])):
        over_runs = 0
        over_wickets = 0
        
        for delivery in over_data.get('deliveries', []):
            over_runs += delivery.get('runs', {}).get('total', 0)
            if 'wickets' in delivery:
                over_wickets += len(delivery['wickets'])
        
        cumulative_runs += over_runs
        total_wickets += over_wickets
        
        momentum.append({
            'over': over_idx + 1,
            'runs': over_runs,
            'wickets': over_wickets,
            'cumulative_runs': cumulative_runs,
            'total_wickets': total_wickets,
            'run_rate': round(cumulative_runs / (over_idx + 1), 2)
        })
        
    return momentum
