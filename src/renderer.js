import { createContext, useCallback, useContext, useState } from "react";
import useEventbus from "./event";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useDrop } from "react-dnd";

const Color = styled.button`
  color: red;
`;

const Button = styled(Color)`
  font-size: ${(props) => props.size}px;
`;

const ElementContext = createContext();

function Wrapper({ x, y, children }) {
  const [selected, setSelected] = useState(false);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "KNIGHT",
      drop: () => console.log({ x, y }),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
      canDrop: function () {
        console.log(arguments);
      },
    }),
    [x, y]
  );

  return (
    <ElementContext.Provider value={{ selected }}>
      <div
        ref={drop}
        style={{ position: "relative" }}
        onClick={(e) => {
          setSelected(true);

          e.stopPropagation();
        }}
      >
        {children}
        {isOver ? "T" : "F"}
        {isOver && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              zIndex: 1,
              opacity: 0.5,
              backgroundColor: "yellow",
            }}
          />
        )}
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
  const context = useContext(ElementContext);

  // const widget = useSelector((store) => store.widgets[widgetId]);
  const widget = useSelector((store) => getWidget(widgetId)(store));
  const dispatch = useDispatch();

  console.log(widgetId, widget);

  const click = useCallback(() => {
    dispatch({ type: "updateWidget", payload: widget });
  }, [widget]);

  return (
    <Wrapper>
      Child {widget.title} {context?.selected ? "Yes" : ""} -{" "}
      <Button onClick={click} size={level + 10}>
        Count ({widget.count})
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
