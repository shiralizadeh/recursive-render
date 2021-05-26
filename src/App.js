import { useDispatch, useSelector } from "react-redux";
import Renderer from "./renderer";

function App() {
  const widgets = useSelector((item) => item.widgets);
  const dispatch = useDispatch();

  console.log(widgets);

  return (
    <>
      <button onClick={() => dispatch({ type: "updateRoot" })}>OK</button>
      {widgets.root.children.map((widgetId) => {
        return <Renderer key={widgetId} level={0} widgetId={widgetId} />;
      })}
    </>
  );
}

export default App;
