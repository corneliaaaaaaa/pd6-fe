import { publicConstants } from '../actions/constant';

const byId = (state = {}, action) => {};

// export default function institutes(state = initialState, action) {
//   switch (action.type) {
//     case publicConstants.GET_INSTITUTE_START:
//       return {
//         ...state,
//         loading: true,
//       };
//     case publicConstants.GET_INSTITUTE_SUCCESS:
//       return {
//         institutes: {
//           byId: action.payload.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state.institutes),
//           allIds: action.payload.map((item) => item.id),
//         },
//         error: null,
//         loading: false,
//       };
//     case publicConstants.GET_INSTITUTE_FAIL:
//       return {
//         ...state,
//         error: action.payload.error,
//         loading: false,
//       };
//     default:
//       return state;
//   }
// }
