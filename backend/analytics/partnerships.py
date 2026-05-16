def calculate_partnerships(innings_data):
    """
    Calculates batting partnerships.
    """
    partnerships = []
    current_partnership = {
        'batters': set(),
        'runs': 0,
        'balls': 0,
        'start_over': 0,
        'end_over': 0
    }
    
    for over_data in innings_data.get('overs', []):
        over_num = over_data.get('over')
        for delivery in over_data.get('deliveries', []):
            batter = delivery.get('batter')
            non_striker = delivery.get('non_striker')
            runs = delivery.get('runs', {}).get('total', 0)
            
            batters = {batter, non_striker}
            
            if not current_partnership['batters']:
                current_partnership['batters'] = batters
                current_partnership['start_over'] = over_num
            
            if batters == current_partnership['batters']:
                current_partnership['runs'] += runs
                current_partnership['balls'] += 1
                current_partnership['end_over'] = over_num
            else:
                # Partnership broken
                partnerships.append({
                    'batters': list(current_partnership['batters']),
                    'runs': current_partnership['runs'],
                    'balls': current_partnership['balls'],
                    'overs': f"{current_partnership['start_over']}-{current_partnership['end_over']}"
                })
                # New partnership
                current_partnership = {
                    'batters': batters,
                    'runs': runs,
                    'balls': 1,
                    'start_over': over_num,
                    'end_over': over_num
                }
                
    # Add final partnership
    if current_partnership['batters']:
        partnerships.append({
            'batters': list(current_partnership['batters']),
            'runs': current_partnership['runs'],
            'balls': current_partnership['balls'],
            'overs': f"{current_partnership['start_over']}-{current_partnership['end_over']}"
        })
        
    return partnerships
