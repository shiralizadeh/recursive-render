import { PureComponent } from "react";
import { useDrag } from "react-dnd";
import { connect, useDispatch, useSelector } from "react-redux";
import Renderer from "./renderer";

const Kinght = function () {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'KNIGHT',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
      }}
    >
      KNIGHT
    </div>
  );
};

function App() {
  const widgets = useSelector((item) => item.widgets.root);
  const dispatch = useDispatch();

  console.log(widgets);

  return (
    <>
      <Kinght></Kinght>
      <button onClick={() => dispatch({ type: "updateRoot" })}>OK</button>
      {widgets.children.map((widgetId) => {
        return <Renderer key={widgetId} level={0} widgetId={widgetId} />;
      })}
    </>
  );
}

export default App;
