[@bs.val] external fetch: string => Js.Promise.t('a) = "fetch";

type country = {
  value: string,
  label: string
};

type countries = array(country);

type countriesState = 
| LoadingCountries
| ErrorFetchingCountries
| LoadedCountries(countries);

let decodeCountry = json => 
  Json.Decode.{
    value: json |> field("value", string),
    label: json |> field("label", string),
  };

let decodeCountries = Json.Decode.array(decodeCountry);

[@react.component]
let make = () => {
  let (countries, setCountries) = React.useState(() => LoadingCountries);

  React.useEffect0(() => {
    Js.Promise.(
      fetch("https://gist.githubusercontent.com/rusty-key/659db3f4566df459bd59c8a53dc9f71f/raw/4127f9550ef063121c564025f6d27dceeb279623/counties.json")
        |> then_(response => response##json())
        |> then_(jsonResponse => {
          let data: countries = jsonResponse |> decodeCountries;
          setCountries(_ => LoadedCountries(data));
          Js.Promise.resolve();
        })
        |> catch(_err => {
          setCountries(_ => ErrorFetchingCountries);
          Js.Promise.resolve();
        })
        |> ignore
      );
    None;
  });

  <ul>
    {switch (countries) {
     | ErrorFetchingCountries => 
        <li>{ React.string("An error occurred!") }</li>
     | LoadingCountries => 
        <li>{ React.string("Loading...") }</li>
     | LoadedCountries(data) =>
       data
        ->Belt.Array.mapWithIndex((i, country) => {
            <li key={country.label}>{ React.string(country.value) }</li>
          })
        ->React.array
     }}
  </ul>
};
