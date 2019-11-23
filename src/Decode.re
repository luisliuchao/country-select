let country = json => 
  Json.Decode.({
    label: json |> field("label", string),
    value: json |> field("value", string),
  }: Model.item)

let countries = Json.Decode.array(country);
