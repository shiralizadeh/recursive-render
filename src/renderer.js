import { createContext, useContext, useState } from "react";
import useEventbus from "./event";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

const Color = styled.button`
  color: red;
`;

const Button = styled(Color)`
  font-size: ${(props) => props.size}px;
`;

const ElementContext = createContext();

function Wrapper({ level, children }) {
  const [selected, setSelected] = useState(false);

  return (
    <ElementContext.Provider value={{ selected }}>
      <div
        onClick={(e) => {
          setSelected(true);

          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </ElementContext.Provider>
  );
}

const getWidgets = (store) => store.widgets;
const getWidget = (widgetId) =>
  createSelector([getWidgets], (widgets) => {
    return widgets[widgetId];
  });

console.log(getWidget);

function Renderer({ widgetId, level, indx }) {
  // const widget = useSelector(store => store.widgets[widgetId]);
  const widget = useSelector((store) => getWidget(widgetId)(store));
  const dispatch = useDispatch();

  console.log(widgetId, widget);

  const context = useContext(ElementContext);

  const [index, setIndex] = useState(0);
  const click = () => {
    dispatch({ type: "updateWidget", payload: widget });

    if (false && index === 2) {
      fireEvent({
        index,
        level,
      });

      Promise.resolve().then(() => console.log("here"));
    }

    setIndex((index) => index + 1);
  };

  const { fireEvent } = useEventbus({
    onEvent: (action) => {
      if (level === 2) {
        setIndex(1000);
      }

      console.log(action);
    },
  });

  return (
    <Wrapper>
      {indx === 1 && level === 2 ? (
        <OtherRed />
      ) : level === 3 ? (
        <OtherBlue />
      ) : (
        <>
          Child {widget.title} {context?.selected ? "Yes" : ""}
        </>
      )}
      <Button onClick={click} size={level + 10}>
        OK ({index}) Count ({widget.count})
      </Button>
      {widget.children?.length && (
        <ul className="App">
          {widget.children?.map((widgetId, i) => (
            <li key={widgetId}>
              <Renderer level={level + 1} widgetId={widgetId} indx={i} />
            </li>
          ))}
        </ul>
      )}
    </Wrapper>
  );
}

// function Widget({ child, click,  }) {
//   return (
//     <>
//       Child {child.title} {context?.selected ? "Yes" : ""}
//       <Button onClick={click} size={level + 10}>
//         OK ({index})
//       </Button>
//     </>
//   );
// }

const Red = styled.div`
  color: red;
`;

const Blue = styled.div`
  color: blue;
`;

function OtherRed() {
  const items = useSelector((store) => store.items);

  return <Red>{items.join(" - ")}</Red>;
}

function OtherBlue() {
  const items = useSelector((store) => store.items[0]);

  return <Blue>{items.join(" - ")}</Blue>;
}

export default Renderer;
