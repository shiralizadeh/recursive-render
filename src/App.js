import { createContext, useContext, useState } from "react";
import useEventbus from "./event";

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

function App({ level }) {
  console.log("render" + level);
  const context = useContext(ElementContext);

  const [index, setIndex] = useState(0);
  const click = () => {
    if (index === 2) {
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

  if (level === 5) return "Done";

  return (
    <Wrapper>
      <ul className="App">
        <li>
          App {level} {context?.selected ? "Yes" : ""}
          <button onClick={click}>OK ({index})</button>
          <App level={level + 1} />
        </li>
      </ul>
    </Wrapper>
  );
}

export default App;
