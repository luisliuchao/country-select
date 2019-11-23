
[@bs.val] external fetch: string => Js.Promise.t('a) = "fetch";

type countries = 
| LoadingCountries
| ErrorFetchingCountries
| LoadedCountries(Model.items);

type state = {
  inputValue: string,
  countries: countries,
  allCountries: Model.items,
};

[@react.component]
let make = (
    ~className: string=?,
    ~country: option(string),
    ~onChange: string => unit=(_) => ()
  ) => {

  let inputValue: string = 
    switch (country) {
     | Some(value) => value
     | None => ""
     };

  let initialState = {
    inputValue,
    countries: LoadingCountries,
    allCountries: [||],
  };

  let (state, setState) = React.useState(() => initialState);

  // fetch countries data
  React.useEffect0(() => {
    Js.Promise.(
      fetch("https://gist.githubusercontent.com/rusty-key/659db3f4566df459bd59c8a53dc9f71f/raw/4127f9550ef063121c564025f6d27dceeb279623/counties.json")
        |> then_(response => response##json())
        |> then_(jsonResponse => {
          let data: Model.items = jsonResponse |> Decode.countries;
          setState(state => { ...state, countries: LoadedCountries(data), allCountries: data });
          Js.Promise.resolve();
        })
        |> catch(_err => {
          setState(state => { ...state, countries: ErrorFetchingCountries });
          Js.Promise.resolve();
        })
        |> ignore
      );
    None;
  });

  let handleValueChange: string => unit = value => {
    switch (state.countries) {
     | LoadedCountries(_) => 
        let filteredItems: Model.items = 
          state.allCountries -> Belt.Array.keep(item => {
            value == "" || Js.String.includes(value, Js.String.toLowerCase(item.label))
          });
        setState(state => { ...state, countries: LoadedCountries(filteredItems) })
     | _ => ()
     };
    setState(state => { ...state, inputValue: value });
  };

  <div>
    <SelectInput 
      value=state.inputValue
      onChange=handleValueChange
    />
    {
      switch (state.countries) {
       | ErrorFetchingCountries => 
          <div>{ React.string("An error occurred!") }</div>
       | LoadingCountries => 
          <div>{ React.string("Loading...") }</div>
       | LoadedCountries(items) => <SelectMenu items=items />
       }
    } 
  </div>
};
