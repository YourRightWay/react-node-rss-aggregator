export default function createActionGraphReducer(initial_state, transition_graph ) {

    let KNOWN_ACTIONS = [];

    for (let state in transition_graph) {

        KNOWN_ACTIONS = KNOWN_ACTIONS.concat(Object.keys(transition_graph[state]));

    }
    
    return function (state = initial_state, action) {

        let transition_map = transition_graph[state.STATE];
        
        if (!transition_map) throw new Error("Отсутствует граф переходов для состояния " + state.STATE);
        let handler;
        
        if (action.type in transition_map) {
            handler = transition_map[action.type];
        }

        switch (typeof handler) {
            case "undefined":
                if (KNOWN_ACTIONS.indexOf(action.type) != -1) {
                    try {
                        console.error(`Событие ${action.type} не поддерживается в состоянии ${state.STATE}.`)
                    } catch(e) {}
                }
                break;
            case "function":
                state = Object.assign({}, state, handler(state, action));
                break;
            case "object":
                if (handler !== null) {
                    state = Object.assign({}, state, handler);
                }
                break;
            default:
                throw new Error(`Неправильно настроен граф переходов для ${action.type}@${state.STATE}`);
        }

        return state;

    }

}
