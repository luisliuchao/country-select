[@bs.val] external fetch: string => Js.Promise.t('a) = "fetch";

type country = {
	value: string,
	label: string,
};

let decodeCountry = json => 
	Json.Decode.{
		value: json |> field("value", string),
		label: json |> field("label", string)
	};

let decodeCountries = Json.Decode.array(decodeCountry)

type state =
| LoadingCountries
| ErrorFetchingCountries
| LoadedCountries(array(country));

[@react.component]
let make = () => {
	let (state, setState) = React.useState(() => LoadingCountries);

  // Notice that instead of `useEffect`, we have `useEffect0`. See
  // reasonml.github.io/reason-react/docs/en/components#hooks for more info
  React.useEffect0(() => {
  	Js.Promise.(
  		fetch("https://gist.githubusercontent.com/rusty-key/659db3f4566df459bd59c8a53dc9f71f/raw/4127f9550ef063121c564025f6d27dceeb279623/counties.json")
	  		|> then_(response => response##json())
	  		|> then_(jsonResponse => {
	  			let countries: array(country) = 
	  				jsonResponse |> decodeCountries;
	  			setState(_previousState => LoadedCountries(countries));
	  			Js.Promise.resolve();
	  		})
	  		|> catch(_err => {
	  			setState(_previousState => ErrorFetchingCountries);
	  			Js.Promise.resolve();
	  		})
	  		|> ignore
  		);

    // Returning None, instead of Some(() => ...), means we don't have any
    // cleanup to do before unmounting. That's not 100% true. We should
    // technically cancel the promise. Unofortunately, there's currently no
    // way to cancel a promise. Promises in general should be way less used
    // for React components; but since folks do use them, we provide such an
    // example here. In reality, this fetch should just be a plain callback,
    // with a cancellation API
    None;
  });

  <div
	  style={ReactDOMRe.Style.make(
	  	~height="120px",
	  	~display="flex",
	  	~alignItems="center",
	  	~justifyContent="center",
	  	(),
  	)}>
	  {switch (state) {
	  	| ErrorFetchingCountries => React.string("An error occurred!")
	  	| LoadingCountries => React.string("Loading...")
	  	| LoadedCountries(countries) =>
	  		countries
		  	-> Belt.Array.mapWithIndex((i, country) => {
		  		<div>
				    {React.string(country.value)}
		  		</div>
		  	})
		  	-> React.array
	  }}
  </div>;
};
