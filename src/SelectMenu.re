[@react.component]
let make = (
    ~items: array(Model.item),
  ) => {
  <ul>
    {
      items
      ->Belt.Array.map((item) => {
          <li key={item.value}>{ React.string(item.label) }</li>
        })
      ->React.array
    }
  </ul>
};
