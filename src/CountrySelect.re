type state = {
  value: string
};

type action =
  | Change(string)
  | KeyDown(int);

let initialState = { 
  value: ""
};

[@react.component]
let make = (
    ~className: string=?,
    ~country: option(string),
    ~onChange: string => unit=(_) => ()
  ) => {
  let value = "us";
  <div>
    <SelectInput 
      value=value 
      onChange=(value => Js.log(value))
    />
    <SelectMenu />
  </div>
};
