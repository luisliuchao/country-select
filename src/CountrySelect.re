
[@bs.val] external fetch: string => Js.Promise.t('a) = "fetch";

type country = Model.item;

type countries = 
| LoadingCountries
| ErrorFetchingCountries
| LoadedCountries(array(country));

type state = {
  countries: countries,
  selectedCountry: option(country),
};

[@react.component]
let make = (
    ~className: string=?,
    ~country: option(string),
    ~onChange: string => unit=(_) => ()
  ) => {

  let initialState = {
    countries: LoadingCountries,
    selectedCountry: None,
  };

  let (state, setState) = React.useState(() => initialState);

  // fetch countries data
  React.useEffect0(() => {
    Js.Promise.(
      fetch("https://gist.githubusercontent.com/rusty-key/659db3f4566df459bd59c8a53dc9f71f/raw/4127f9550ef063121c564025f6d27dceeb279623/counties.json")
        |> then_(response => response##json())
        |> then_(jsonResponse => {
          let items: array(country) = jsonResponse |> Decode.countries;
          switch (country) {
          | Some(value) => 
            let selectedItems = items -> Belt.Array.keep(item => item.value == Js.String.toLowerCase(value));
            switch (Js.Array.length(selectedItems)) {
            | 0 => ()
            | _ => setState(state => { ...state, selectedCountry: Some(selectedItems[0])})
            }
          | None => ()
          }
          setState(state => { ...state, countries: LoadedCountries(items)  });
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

  let handleSelect: country => unit = country => {
    setState(state => { ...state, selectedCountry: Some(country) });
    onChange(country.value);
  };

  let { selectedCountry, countries } = state;

  <div className>
    <div className=Styles.container>
      { 
        switch (selectedCountry) {
        | Some(country) => React.string(country.label)
        | None => React.string("Nothing selected")
        }
      }
    </div>
    {
      switch (countries) {
       | ErrorFetchingCountries => 
          <div>{ React.string("An error occurred!") }</div>
       | LoadingCountries => 
          <div>{ React.string("Loading...") }</div>
       | LoadedCountries(items) => 
          <SelectMenu 
            items=items 
            selectedItem=selectedCountry
            onSelect=handleSelect
          />
       }
    } 
  </div>
};
