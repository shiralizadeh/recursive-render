import { createStore } from "redux";

const initialState = {
  layout: [
    {
      id: "094c550c-1878-47b3-9a52-41ef9e2f1c96",
      title: "Root A",
      count: 0,
      children: [
        {
          id: "9930fcc6-852d-4855-b594-472ed92bdf5a",
          title: "Child A.A",
          count: 0,
        },
        {
          id: "903418cd-7484-45f1-8f19-875aa5a57276",
          title: "Child A.B",
          count: 0,
          children: [
            {
              id: "6b0be748-44c0-43d9-946b-8f5434bfa48e",
              title: "Child A.B.A",
              count: 0,
              children: [
                {
                  id: "66105f3f-0727-4364-b66d-709e56d03702",
                  title: "Child A.B.A.A",
                  count: 0,
                },
              ],
            },
            {
              id: "d3d559ed-0efc-4889-a1d1-87e586199893",
              title: "Child A.B.B",
              count: 0,
            },
          ],
        },
      ],
    },
  ],
  widgets: [
    {
      id: "root",
      children: ["094c550c-1878-47b3-9a52-41ef9e2f1c96"],
    },
    {
      id: "094c550c-1878-47b3-9a52-41ef9e2f1c96",
      title: "Root A",
      count: 0,
      children: [
        "9930fcc6-852d-4855-b594-472ed92bdf5a",
        "903418cd-7484-45f1-8f19-875aa5a57276",
      ],
    },
    {
      id: "9930fcc6-852d-4855-b594-472ed92bdf5a",
      title: "Child A.A",
      count: 0,
    },
    {
      id: "903418cd-7484-45f1-8f19-875aa5a57276",
      title: "Child A.B",
      count: 0,
      children: [
        "6b0be748-44c0-43d9-946b-8f5434bfa48e",
        "d3d559ed-0efc-4889-a1d1-87e586199893",
      ],
    },
    {
      id: "6b0be748-44c0-43d9-946b-8f5434bfa48e",
      title: "Child A.B.A",
      count: 0,
      children: ["66105f3f-0727-4364-b66d-709e56d03702"],
    },
    {
      id: "66105f3f-0727-4364-b66d-709e56d03702",
      title: "Child A.B.A.A",
      count: 0,
    },
    {
      id: "d3d559ed-0efc-4889-a1d1-87e586199893",
      title: "Child A.B.B",
      count: 0,
    },
  ],
  items: [[0, 1], 2, 3, 4, 5],
};

function rootReducer(state = initialState, action) {
  console.log(action.payload);

  if (action.type === "updateWidget") {
    const index = state.widgets.findIndex(
      (widget) => widget.id == action.payload.id
    );

    state.widgets[index] = {
      ...state.widgets[index],
      count: state.widgets[index].count + 1,
    };

    return {
      ...state,
      widgets: [...state.widgets],
    };
  }

  if (action.type === "updateRoot") {
    return {
      ...state,
      items: [...state.items, Math.random()],
    };
  }

  return state;
}

const store = createStore(rootReducer);

export default store;
