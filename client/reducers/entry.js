import { ENTRY_UPDATE, ENTRY_ADD, ENTRY_ALL } from "../actions/types"

const Entry = (state = [], actions = {}) => { 

  switch(actions.type){ 

    case ENTRY_ADD:
      return [...state, actions.payload ];

    case ENTRY_UPDATE:
      return state.map(data => {
        if(data.entry_id === actions.payload.entry_id){
          return actions.payload;
        }
        return data;
      });

    case ENTRY_ALL:
      return [ ...actions.payload ];

    default:
      return state
  }
}

export default Entry;

