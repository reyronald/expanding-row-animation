import React from "react";
import { Transition } from "react-transition-group";

export function CollapseTransition({ expanded, children, onEnter, onExiting }) {
  const heightRef = React.useRef(0);

  return (
    <Transition
      appear
      unmountOnExit
      in={expanded}
      timeout={null}
      addEndListener={(node, done) =>
        node.addEventListener("transitionend", done, false)
      }
      onEnter={node => {
        onEnter(node);
        heightRef.current = node.offsetHeight;
        node.style.height = "0";
        // Force synchronous layout reflow/repaint
        // before going into the next lifecycle,
        // a.k.a "layout thrashing"
        // tslint:disable-next-line no-unused-expression
        node.scrollTop;
      }}
      onEntering={node => {
        node.style.height = `${heightRef.current}px`;
      }}
      onEntered={node => {
        node.style.height = "";
      }}
      onExit={node => {
        node.style.height = `${node.offsetHeight}px`;
      }}
      onExiting={node => {
        requestAnimationFrame(() => {
          node.style.height = "0";
        });
        onExiting();
      }}
    >
      {children}
    </Transition>
  );
}
