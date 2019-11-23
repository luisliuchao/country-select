type state = {
  value: string,
};

type action =
  | Change(string)
  | KeyDown(int);

let initialState = { 
  value: "",
};

[@react.component]
let make = (
    ~value: string=?,
    ~onChange: string => unit=(_) => (),
    ~onEnter: unit => unit=() => ()
  ) => {
  let reducer = (_, action) => {
    switch (action) {
    | Change(value) => {
      onChange(value)
      ReasonReact.Update({ value: value })
    }
    | KeyDown(13) => {
      onEnter()
      ReasonReact.NoUpdate
    }
    | KeyDown(_) => ReasonReact.NoUpdate
    };
  };

  let (_, dispatch) = React.useReducer(reducer, ReasonReact.Update(initialState));

  <div>
    <input
      value=value
      onChange=(
        event => dispatch(Change(ReactEvent.Form.target(event)##value))
      )
      onKeyDown=(
        event => dispatch(KeyDown(ReactEvent.Keyboard.which(event)))
      )
    />
  </div>;
};
