import { useEffect } from "react";
import { Subject } from "rxjs";

// our eventloop Subject Observable
export const eventbusSubject = new Subject();

/**
 * Hook allows fire and list events between components (even between different packages)
 * @param props - onEvent callback to fire on Subject Observable subscribed event
 * @returns Function (fireEvent callback)
 */
function useEventbus(props) {
  const { onEvent } = props || {};

  useEffect(() => {
    // skip useEffect if onEvent is empty
    if (!onEvent) {
      return;
    }

    // subscribe to the Subject Observable
    const subscription = eventbusSubject.subscribe((event) => {
      onEvent(event);
    });

    // we should unsubscribe after component's unmount to remove extra subscribes
    return () => {
      subscription.unsubscribe();
    };
  }, [onEvent]);

  return {
    // on fireEvent, we should push the event into the eventbus subject's observer
    fireEvent: (event) => {
      eventbusSubject.next(event);
    },
  };
}

export default useEventbus;
